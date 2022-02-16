import React from "react";
export default function Login(props) {
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
    props.onAuthorization(
      {password, email }
    )
  }
  return (
    <section
      className='authorization'
    >
      <h2 className="authorization__title">Вход</h2>

      <form
        id="login-form"
        className='authorization__form authorization__form_login'
        name='register__form'
        onSubmit={handleSubmit}
      >
        <input
          className="authorization__input"
          name="login-email"
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
          name="login-password"
          type="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          value={password}
          onChange={handleChangePassword}
          required
        />

        <button className="authorization__submit-button" type="submit">
          Войти
        </button>

      </form>

    </section>
  )
}