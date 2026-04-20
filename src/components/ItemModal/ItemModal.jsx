import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDeleteItem, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  
  if (!card) {
    return null;
  }

  const isOwn =
    card.owner === currentUser?._id || card.owner?._id === currentUser?._id;

  const handleDeleteClick = () => {
    if (!card || !card._id) return;
    onDeleteItem(card._id);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          {isLoggedIn && isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
