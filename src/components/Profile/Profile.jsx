import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";



function Profile({ clothingItems, onCardClick, onEditProfile, onLogout, onCardLike, isLoggedIn, }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}

export default Profile;