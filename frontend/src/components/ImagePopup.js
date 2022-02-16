export default function ImagePopup({ card, onClose, onPopupClick }) {
  return (
    <section
      className={`popup popup_type_image ${card ? "popup_opened" : " "}`}
      onClick={onPopupClick}
    >
      <div className="popup__content">
        <img
          className="popup__large-image"
          alt={card ? card.name : ""}
          src={card ? card.link : ""}
        />
        <p className="popup__subtitle">{card ? card.name : ""}</p>
        <button
          className="popup__reset-button popup__reset-button_type_image"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}
