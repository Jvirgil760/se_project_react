import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg"
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = ({
  weatherData,
  handleAddClick,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
  onLogout,
}) => {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  if (!weatherData) return null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Teggene";
  const avatar = avatarDefault;

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <Link to="/" className="header__home-link">
            <img className="header__logo" src={logo} alt="WTWR logo" />
          </Link>
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </div>

        <nav
          className={`header__nav ${
            isMobileMenuOpened ? "header__nav_opened" : ""
          }`}
        >
          <ToggleSwitch />

          {isLoggedIn ? (
            <>
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-button"
              >
                + Add clothes
              </button>

              <NavLink className="header__nav-link" to="/profile">
                <div className="header__profile">
                  <p className="header__user-name">{currentUser.name}</p>

                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="header__avatar"
                    />
                  ) : (
                    <div className="header__avatar header__avatar-placeholder">
                      {currentUser.name?.[0]?.toUpperCase() || ""}
                    </div>
                  )}
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-button"
                onClick={onRegisterClick}
              >
                Sign Up
              </button>

              <button
                type="button"
                className="header__auth-button"
                onClick={onLoginClick}
              >
                Log In
              </button>
            </>
          )}
        </nav>

        {isMobileMenuOpened && (
          <button
            type="button"
            className="header__mobile-close"
            onClick={handleMobileMenuClick}
          >
            Close
          </button>
        )}

        {!isMobileMenuOpened && (
          <button
            type="button"
            className="header__mobile-menu"
            onClick={handleMobileMenuClick}
          >
            Menu
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
