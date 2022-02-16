import React from "react";
import PopupWithForm from "./PopupWithForm";
export default function EditAvatarPopup(props) {
  const inputWithSource = React.useRef(); // записываем объект, возвращаемый хуком, в переменную
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputWithSource.current.value,
    });
  }
  React.useEffect(() => {
    inputWithSource.current.value=''
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onClickPopup={props.onClickPopup}
      onSubmit={handleSubmit}
      name="change-avatar"
      title="Обновить аватар"
      titleOfButton="Сохранить"
    >
      <input
        ref={inputWithSource}  
        className="popup__input popup__input_type_avatar"
        name="avatar"
        type="url"
        placeholder="Введите адрес аватара"
        required
      />
      <span className="popup__error popup__error_visible" id="avatar-error">
        Введите адрес сайта
      </span>
    </PopupWithForm>)
}
