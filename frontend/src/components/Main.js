import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img className="profile__img" alt="аватар" src={currentUser.avatar} />
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__open-popup"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__specification">{currentUser.about}</p>
        </div>
        <button
          className="profile__adding-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        {props.cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onLikeClick={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          );
        })}
      </section>
    </main>
  );
}
