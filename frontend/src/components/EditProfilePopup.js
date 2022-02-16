import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onClickPopup={props.onClickPopup}
      onSubmit={handleSubmit}
      name="profile"
      title="Обновить профиль"
      titleOfButton="Сохранить"
    >
      <input
        className="popup__input popup__input_type_name"
        name="name"
        type="text"
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className="popup__error" id="name-error">
        Вы пропустили это поле
      </span>
      <input
        className="popup__input popup__input_type_specification"
        name="about"
        type="text"
        placeholder="Ваша специальность"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__error" id="about-error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>
  )
}