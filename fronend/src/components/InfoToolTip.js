import ok from "../images/ok.svg";
import error from "../images/error.svg";
export function InfoToolTip(props){
  return (
    <section
      className={`popup ${props.isOpen ? "popup_opened" : " "}`}
      onClick={props.onPopupClick}
    >
      <div className="popup__content popup__content_infoToolTip">
        <img
          className="popup__infoImage"
          src={props.isAuthorization ? ok : error}
          alt={props.isAuthorization ? 'Вы успешно авторизировались' : 'Что-то пошло не так'}
        />
        <p className="popup__infoText">{props.isAuthorization ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button
          className="popup__reset-button popup__reset-button_type_infoToolTip"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  )
}
