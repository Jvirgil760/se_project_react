import "./ModalWithForm.css";

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
