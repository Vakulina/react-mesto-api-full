import React from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [source, setSource] = React.useState('');
  function handleChangePlace(e) {
    setPlace(e.target.value);
  }
  function handleChangeSource(e) {
    setSource(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ name: place, link: source })
  }
  React.useEffect(() => {
    setPlace('');
    setSource('');
  }, [props.isOpen]);

  return (<PopupWithForm
    isOpen={props.isOpen}
    onClose={props.onClose}
    onClickPopup={props.onClickPopup}
    onSubmit={handleSubmit}
    name="place"
    title="Новое место"
    titleOfButton="Сохранить"
  >
    <input
      className="popup__input popup__input_type_place"
      name="place"
      type="text"
      placeholder="Название"
      minLength="2"
      maxLength="30"
      value={place || ''}
      onChange={handleChangePlace}
      required
    />
    <span className="popup__error popup__error_visible" id="place-error">
      Вы пропустили это поле
    </span>
    <input
      className="popup__input popup__input_type_link"
      name="link"
      type="url"
      placeholder="Ссылка на картинку"
      value={source || ''}
      onChange={handleChangeSource}
      required
    />
    <span className="popup__error popup__error_visible" id="link-error">
      Введите адрес сайта
    </span>
  </PopupWithForm>)
}