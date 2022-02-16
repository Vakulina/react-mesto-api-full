export default function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : " "
        }`}
      onMouseDown={props.onClickPopup}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button
          className={`popup__reset-button popup__reset-button_type_${props.name}`}
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          id="profile-form"
          className={`popup__form popup__form_${props.name}`}
          name={`${props.name}__form`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit-button" type="submit">
            {props.titleOfButton}
          </button>
        </form>
      </div>
    </section>
  );
}
