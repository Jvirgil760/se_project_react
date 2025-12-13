import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";

const Header = ({ weatherData, handleAddClick }) => {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  if (!weatherData) return null;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* TODO -- link to home page */}
        <div className="header__left">
          <img className="header__logo" src={logo} alt="WTWR logo" />
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

          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-button"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__profile">
              <div className="header__user-name">{username}</div>

              {avatar ? (
                <img
                  className="header__avatar"
                  src={avatar || avatarDefault}
                  alt="User avatar"
                />
              ) : (
                <span className="header__avatar sidebar__avatar_none">
                  {username?.toUpperCase().charAt(0) || ""}
                </span>
              )}
            </div>
          </Link>
        </nav>

        {/* mobile controls (ok to leave for now, won’t show on desktop) */}
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
