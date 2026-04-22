import "./ModalWithForm.css";
import { useEffect } from "react";

function useModalClose(isOpen, onClose) {

  useEffect(() => {
    if (!isOpen) return; // stop the effect if the modal is not open

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlay = (e) => {
        // that's why you should have a `modal` class name in each modal to be able to universally handle the overlay click
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    // don't forget to remove both listeners in the clean up function
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]);  // watch isOpen to add the listeners only when the modal is open
}


function ModalWithForm({
  buttonText = "Save",
  title,
  onClose,
  name,
  isOpen,
  children,
  onSubmit,
  secondaryButtonText,
  onSwitch,
}) {
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClose} type="button" className="modal__close" />

        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}

          <div className="modal__button-container">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="modal__switch-button"
                onClick={onSwitch}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;