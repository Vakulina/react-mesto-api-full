import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from '../utils/Api';
import { auth } from "../utils/Auth";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import {  Route, Routes,  useNavigate, Navigate } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import {InfoToolTip} from "./InfoToolTip"
import ProtectedRoute from "./ProtectedRoute";
function App() {
  //переменные состояния видимости попапов
  const [isEditProfilePopupOpen, setProfilePopupStatus] = React.useState(false);
  const [isAddPlacePopupOpen, setEditPopupStatus] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupStatus] = React.useState(false);
  const [isInfoPopupOpen, setInfoPopupStatus] = React.useState(false);
  const [isRequestAuthStatus, setRequestAuthStatus] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setUser] = React.useState({ name: '', about: '', avatar: '' });
  const [loggedIn, setLoggedStatus] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [cards, setCards] = React.useState([]);
  const navigation = useNavigate();
  
  React.useEffect(() => {
    function getInitialCards() {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res.data.reverse());
        })
        .catch((err) => console.log(`Ошибка связи с сервером: ${err}`));
    }
    getInitialCards();
  }, []);
  
  React.useEffect(() => {
    function getInfoUser() {
      api
        .getInfoUserOfServ()
        
        .then((res) => {
          setUser(res.data);
        })

        .catch((err) => console.log(`Ошибка связи с сервером: ${err}`));
    }
    getInfoUser();
  }, []);

  React.useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        auth.getContent(token)
          .then((res) => {
            setLoggedStatus(true);
            setEmail(res.data.email);
          })
          .catch(err => {
            console.log(`Упс. Что-то пошло не так. Ошибка: ${err}`);
          });
      }
    }
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn === true) {
      navigation('/')
    }
}, [loggedIn, navigation])

  function handleRegisterFormSubmit(data) {
    auth.register(data)
      .then((res) => {
        navigation('/login')
        setRequestAuthStatus(true)
      })
      .catch((err) => {
        setRequestAuthStatus(false)
      })
      .finally(() => {
        setInfoPopupStatus(true)
      })
  }

  function handleOnAuthorization(data) {
    auth.authorize(data)
      .then((res) => {
        localStorage.setItem('token', res.token)
        setLoggedStatus(true)
        setEmail(data.email)
        setRequestAuthStatus(true)
        navigation('/')
      })
      .catch((err) => {
        setRequestAuthStatus(false)
        setInfoPopupStatus(true)
      })
  }
  function handleUpdateUser(data) {
    function setInfoUser() {
      api
        .setNewUserInfo(data)
        .then((res) => {
          setUser(res.data);
          closeAllPopups();
        })
        .catch((err) => console.log(`Ошибка связи с сервером: ${err}`));
    }
    setInfoUser();
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((avatar) => {
        setUser(avatar.data);
        closeAllPopups()
      }
      )
      .catch((err) => {
        console.log(`Ошибка связи с сервером: ${err}`);
      })
  }
  function handleAddPlaceSubmit(newCard) {
    api
      .setNewCard(newCard)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка связи с сервером: ${err}`);
      })
  }

  //объявляем функции обновления переменных состояния
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditProfileClick() {
    setProfilePopupStatus(true);
  }
  function handleAddPlaceClick() {
    setEditPopupStatus(true);
  }
  function handleEditAvatarClick() {
    setAvatarPopupStatus(true);
  }
  function closeAllPopups() {
    setProfilePopupStatus(false);
    setEditPopupStatus(false);
    setAvatarPopupStatus(false);
    setInfoPopupStatus(false);
    setRequestAuthStatus(false);
    setSelectedCard(null);
  }

  function handleClickPopup(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      closeAllPopups();
      setSelectedCard(null);
    }
  }
  React.useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isInfoPopupOpen
    ) {
      function handleEsc(evt) {
        if (evt.key === "Escape") {
          evt.preventDefault();
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.addEventListener("keydown", handleEsc);
      };
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isInfoPopupOpen]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .likeCard(card._id, isLiked)
                .then((newCard) => {
                   setCards(state => {
             
                   return state.map(currentCard =>
                    currentCard._id === card._id ? newCard.data : currentCard
                  )});
      })
      .catch((err) => {
        console.log(`Ошибка связи с сервером: ${err}`);
      })
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards(cards.filter(item => !(item._id === card._id))))
      .catch((err) => {
        console.log(`Ошибка связи с сервером: ${err}`);
      })
  }

  function signOut() {
    localStorage.removeItem('token');
    auth.getContent('')
      .catch((err) => {    //убеждаемся, что сервер нас не может авторизовать
        setLoggedStatus(false);
        navigation('/login');
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={
            <>
              <Header loggedIn={loggedIn} email={email} signOut={signOut} linkName='Выйти' to="/login" />
              <ProtectedRoute
              loggedIn={loggedIn}
              component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </>
          } />

          <Route path="/login" element={
            <>
              <Header loggedIn={loggedIn} linkName='Регистрация' to='/register' />
              <Login onAuthorization={handleOnAuthorization} />
            </>
          } />

          <Route path="/register" element={
            <>
              <Header loggedIn={loggedIn} linkName='Войти' to='/login' />
              <Register onRegister={handleRegisterFormSubmit} />
            </>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <InfoToolTip isOpen={isInfoPopupOpen} isAuthorization={isRequestAuthStatus} onPopupClick={handleClickPopup} onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onPopupClick={handleClickPopup}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onClickPopup={handleClickPopup}
          onAddPlace={handleAddPlaceSubmit} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onClickPopup={handleClickPopup}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onClickPopup={handleClickPopup}
          onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm
          isClose={closeAllPopups}
          onClickPopup={handleClickPopup}
          name="delete-card"
          title="Вы уверены?"
          titleOfButton="Да"
        ></PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
