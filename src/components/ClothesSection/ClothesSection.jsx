import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function ClothesSection({ clothingItems, onCardClick, onAddClick, onCardLike, isLoggedIn  }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button className="clothes-section__add-button" onClick={onAddClick} >+ Add new</button>
      </div>
      <ul className="clothes-section__items">
      {(clothingItems || [])
        .filter((item) => item.owner === currentUser._id)
        .map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} onCardLike={onCardLike} isLoggedIn={isLoggedIn} />
        ))
      }
      </ul>
    </div>
  );
}
