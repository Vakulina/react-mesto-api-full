import React from 'react';
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {(props.loggedIn) ?
   
        (<div className='header__text-wrapper'>
        <span className='header__mail'>{props.email}</span>
        <p className="header__text"><button onClick={props.signOut} className='header__button '>Выйти</button></p>
        </div>) :
        (<Link className="header__text" to={props.to}>{props.linkName}</Link>)
      }
    </header>
  );
}
export default Header;
