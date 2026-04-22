import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import ProtectedRoute from "../ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signup, signin, checkToken } from "../../utils/auth";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getItems, addItem, removeItem, updateUserProfile, addCardLike, removeCardLike } from "../../utils/api";


function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };
  
  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
  
    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
  
    const isLiked = item.likes.some((like) =>
      typeof like === "string"
        ? like === currentUser._id
        : like._id === currentUser._id
    );
  
    const request = isLiked
      ? removeCardLike(item._id, token)
      : addCardLike(item._id, token);
  
    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((card) => (card._id === item._id ? updatedCard : card))
        );
      })
      .catch(console.error);
  };

function handleSubmit(request) {
  setIsLoading(true);
  request()
    .then(closeActiveModal)
    .catch(console.error)
    .finally(() => setIsLoading(false));
}

  const [isLoading, setIsLoading] = useState(false);

  const onAddItem = (inputValues) => {
    const makeRequest = () => {
      const newCardData = {
        name: inputValues.name,
        imageUrl: inputValues.imageUrl,
        weather: inputValues.weather,
      };
      const token = localStorage.getItem("jwt");
      
      return addItem(newCardData, token).then((data) => {
        setClothingItems([data.data, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    removeItem(id, token)
      .then(() => {
        // remove the deleted item from state
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        // close the modal
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => signin({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setIsRegisterModalOpen(false);
        navigate("/");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        navigate("/");
      })
      .catch(console.error);
  };

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };


  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal
  
    const handleEscClose = (e) => {  // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
  
    document.addEventListener("keydown", handleEscClose);
  
    return () => {  // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);  // watch activeModal here
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} isLoggedIn={isLoggedIn}
            onRegisterClick={() => setIsRegisterModalOpen(true)}
            onLoginClick={() => setIsLoginModalOpen(true)}
            onLogout={handleLogout} 
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  currentTemperatureUnit={currentTemperatureUnit}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddClick={handleAddClick}
                  onEditProfile={handleEditProfileClick}
                  onLogout={handleLogout}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"} // true
          onAddItem={onAddItem}
          onClose={closeActiveModal}
          buttonText={isLoading ? 'Saving...' : 'Save'}
        />
        <ItemModal
          card={selectedCard}
          onClose={closeActiveModal}
          isOpen={activeModal === "preview"}
          onDeleteItem={handleDeleteItem}
          isLoggedIn={isLoggedIn}
        />
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onRegister={handleRegister}
          onClose={() => setIsRegisterModalOpen(false)}
          onSwitchToLogin={handleSwitchToLogin}
          buttonText={isLoading ? 'Saving...' : 'Save'}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onLogin={handleLogin}
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={handleSwitchToRegister}
          buttonText={isLoading ? 'Saving...' : 'Save'}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={closeActiveModal}
          onUpdateUser={handleUpdateUser}
        /> 
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
