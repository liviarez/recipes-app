import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(submitButton).toBeEnabled();
    // talvez tenha que ser not.toBeDisabled() <====== ATENÇÃO AQUI
  });
  it('Verifica se ocorre o redirecionamento para a tela de receitas após o login', () => {
    const { history } = renderWithRouter(<App />);

    const validEmail = 'emailvalido@email.123';
    const validPassword = '1234567';

    const emailInput = screen.getByTestId(testIdEmail);
    const passwordInput = screen.getByTestId(testIdPassword);
    const submitButton = screen.getByTestId(testIdSubmit);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(submitButton);

    expect(history.location.pathname).toBe('/receitas');
  });
});
