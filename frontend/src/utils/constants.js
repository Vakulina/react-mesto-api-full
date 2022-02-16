const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}
const configConnection = {
 url: 'http://project-mesto.nomoredomains.xyz/',
  headers: {
    'Content-Type': 'application/json',
  }
}
const authConfigConnection ={
 url: 'http://project-mesto.nomoredomains.xyz/',
 headers: {
    'Content-Type': 'application/json'
  }
}
const cardsTemplateSelector = 'place-card';
const containerSelector = '.places';
const closeButtonSelector = '.popup__reset-button';
const openedPopupSelector ='popup_opened';
const largeImageSelector= '.popup__large-image';
const popupSumtitleSelector ='.popup__subtitle';
const inputName = document.querySelector('.popup__input_type_name');
const inputGob = document.querySelector('.popup__input_type_specification');
const formEditProfile = document.querySelector('.popup__form_profile');
const formNewPlace = document.querySelector('.popup__form_place');
const formEditAvatar=document.querySelector('.popup_type_change-avatar')

export { config, configConnection,authConfigConnection, cardsTemplateSelector, containerSelector, largeImageSelector, popupSumtitleSelector,
  closeButtonSelector, openedPopupSelector, inputName, inputGob, formEditProfile, formNewPlace, formEditAvatar};