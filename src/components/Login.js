import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isFormValid,
    setIsFormValid,
  } = useContext(Context);
  const history = useHistory();

  const validateEmail = (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emails);
  };

  const validatePassword = (passwords) => {
    const minPassword = 6;
    if (passwords.length > minPassword) return true;
  };

  const handleEmailChange = ({ target }) => {
    const newEmail = target.value;
    setEmail(newEmail);
    setIsFormValid(validateEmail(newEmail) && validatePassword(password));
  };

  const handlePasswordChange = ({ target }) => {
    const newPassword = target.value;
    setPassword(newPassword);
    setIsFormValid(validateEmail(email) && validatePassword(newPassword));
  };

  const savedStorage = () => {
    if (isFormValid) {
      const user = { email };
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/meals');
    }
  };

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     history.push('/receitas');
  //   }
  // }, [history]);

  return (
    <section className="form-login">
      <form onSubmit={ savedStorage }>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            name="email"
            type="email"
            // value={ email }
            id="email"
            placeholder="Email"
            onChange={ handleEmailChange }
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          <input
            data-testid="password-input"
            name="password"
            type="password"
            // value={ password }
            id="password"
            placeholder="Password"
            onChange={ handlePasswordChange }
          />
        </label>
        <br />
        <button
          className="custom-btn btn-2"
          data-testid="login-submit-btn"
          disabled={ !isFormValid }
        >
          ENTER
        </button>
      </form>
    </section>
  );
}

export default Login;
