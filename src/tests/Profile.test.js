import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Profile from '../components/Profile';

const emailInput = 'profile-email-input';
const passwordInput = 'profile-password-input';
const btnLogin = 'profile-login-btn';
const btnSubmit = 'profile-submit-btn';
const btnDone = 'profile-done-btn';
const btnFavorite = 'profile-favorite-btn';
const btnLogout = 'profile-logout-btn';

describe('Verifica as funcionalidades do componente Profile', () => {
  it('Testa se a pagina contem um header', () => {
    renderWithRouter(<Profile />);
    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
  });
  it('Testa se a pagina contem um footer', () => {
    renderWithRouter(<Profile />);
    const footer = screen.getByTestId('footer-container');
    expect(footer).toBeInTheDocument();
  });
  it('Testa se a pagina contem um titulo', () => {
    renderWithRouter(<Profile />);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });
  it('Testa se a pagina contem um input de email', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId(emailInput);
    expect(email).toBeInTheDocument();
  });
  it('Testa se a pagina contem um input de senha', () => {
    renderWithRouter(<Profile />);
    const password = screen.getByTestId(passwordInput);
    expect(password).toBeInTheDocument();
  });
  it('Testa se a pagina contem um botão de login', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnLogin);
    expect(btn).toBeInTheDocument();
  });
  it('Testa se a pagina contem um botão de submit', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnSubmit);
    expect(btn).toBeInTheDocument();
  });
  it('Testa se a pagina contem um botão de receitas feitas', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnDone);
    expect(btn).toBeInTheDocument();
  });
  it('Testa se a pagina contem um botão de receitas favoritas', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnFavorite);
    expect(btn).toBeInTheDocument();
  });
  it('Testa se a pagina contem um botão de logout', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnLogout);
    expect(btn).toBeInTheDocument();
  });
  it('Testa se o botão de login está desabilitado', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnLogin);
    expect(btn).toBeDisabled();
  });
  it('Testa se o botão de submit está desabilitado', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnSubmit);
    expect(btn).toBeDisabled();
  });
  it('Testa se o botão de receitas feitas está desabilitado', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnDone);
    expect(btn).toBeDisabled();
  });
  it('Testa se o botão de receitas favoritas está desabilitado', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnFavorite);
    expect(btn).toBeDisabled();
  });
  it('Testa se o botão de logout está desabilitado', () => {
    renderWithRouter(<Profile />);
    const btn = screen.getByTestId(btnLogout);
    expect(btn).toBeDisabled();
  });
});
