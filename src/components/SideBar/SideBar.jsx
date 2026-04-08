import "./SideBar.css";
import avatarDefault from "../../assets/avatar.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar || avatarDefault}
            alt={currentUser.name}
          />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {currentUser.name?.toUpperCase().charAt(0) || ""}
          </span>
        )}

        <p className="sidebar__user-name">{currentUser.name}</p>
      </div>
      <button type="button" onClick={onEditProfile}>
        Change profile data
      </button>

      <button type="button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}
