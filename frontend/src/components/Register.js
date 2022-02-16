import React from "react";
import { Link } from "react-router-dom";
export default function Register(props) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(
      {password, email}
    )
  }
  return (
    <section
      className='authorization'
    >
      <h2 className="authorization__title">Регистрация</h2>
      <form
        id="register-form"
        className='authorization__form'
        name='register__form'
        onSubmit={handleSubmit}
      >
        <input
          className="authorization__input"
          name="register-email"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="200"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          className="authorization__input"
          name="register-password"
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <button className="authorization__submit-button" type="submit">
          Зарегистрироваться
        </button>
        <Link className="authorization__link" to="/login">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  )
}