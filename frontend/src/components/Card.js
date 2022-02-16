import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card({ card, onCardClick, onLikeClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); //монтируем глобальный стэйт
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
 
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  console.log(card , currentUser._id )
  function handleDeleteClick() {
    onCardDelete(card);
  }
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onLikeClick(card);
  }
  return (
    <article className="place">
      {isOwn && <button className="place__trash-button" type="button" onClick={handleDeleteClick}></button>}

      <img
        className="place__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="place__name">
        <p className="place__paragraf">{card.name}</p>
        <div className="place__like-group">
          <button className={`place__like-button ${isLiked? 'place__like-button_active' : ''}`} type="button" onClick={handleLikeClick}></button>
          <span className="place__like-amount">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
