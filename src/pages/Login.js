import React from 'react';

function Login() {
  // const { email, setEmail, password, setPassword } = useContext(Context);

  return (
    <section className="form-login">
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            name="email"
            type="email"
            // value={ email }
            id="email"
            placeholder="Email"
            required
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            name="password"
            type="password"
            // value={ password }
            id="password"
            placeholder="Password"
          />
        </label>
        <button
          className="custom-btn btn-2"
          data-testid="login-submit-btn"
        >
          ENTER
        </button>
      </form>
    </section>
  );
}

export default Login;
