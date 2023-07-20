import { screen } from '@testing-library/react';
import Profile from '../components/Profile';
import { renderWithRouter } from '../helpers/renderWithRouter';

describe('Testa a página de Perfil', () => {
  it('Testa renderização da página', () => {
    renderWithRouter(<Profile />);
    const pageTitle = screen.getByText(/profile/i);
    expect(pageTitle).toBeInTheDocument();
  });

  it('Testa funcionalidade do logout', () => {
    renderWithRouter(<Profile />, '/profile');

    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(btnDone).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
    btnDone.click();
    btnFavorite.click();
    btnLogout.click();
  });

  it('Testa se o email do usuário está na página', () => {
    renderWithRouter(<Profile />, '/profile');
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
  });

  it('Testa se a pagina contem um header', () => {
    renderWithRouter(<Profile />);
    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
  });

  it('Testa se a pagina contem um botão de login', () => {
    renderWithRouter(<Profile />);
    const btnLogin = screen.getByTestId('profile-login-btn');
    const btn = screen.getByTestId(btnLogin);
    expect(btn).toBeInTheDocument();
  });
});
