import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from '../helpers/renderWithRouter';

const testIdEmail = 'email-input';
const testIdPassword = 'password-input';
const testIdSubmit = 'login-submit-btn';

describe('Testando o componente Login', () => {
  it('Verifica os inputs do Login', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const submitButton = screen.getByTestId(testIdSubmit);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
  it('Verifica se o botão está habilitado após inserir email e senha', () => {
    renderWithRouter(<App />);

    const validEmail = 'emailvalido@email.123';
    const validPassword = '1234567';

    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdEmail);
    const submitButton = screen.getByTestId(testIdSubmit);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(submitButton).not.toBeEnabled();
  });
  it('Verifica se o redirecionamento está funcionando corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const validEmail = 'emailvalido@email.123';
    const validPassword = '1234567';

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPassword = screen.getByTestId(testIdPassword);
    const submitButton = screen.getByTestId(testIdSubmit);

    act(() => {
      userEvent.type(inputEmail, validEmail);
      userEvent.type(inputPassword, validPassword);
      userEvent.click(submitButton);
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
