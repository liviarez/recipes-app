import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Header from '../components/Header';

const titleTestId = 'page-title';

describe('Verifica as funcionalidades do componente Header', () => {
  it('Verifica se o componente é renderizado na tela', () => {
    renderWithRouter(<Header />);
    const header = screen.getByTestId('profile-top-btn');
    expect(header).toBeInTheDocument();
  });

  it('Verifica se o componente renderiza o icone de perfil e o titulo', () => {
    renderWithRouter(<Header />);
    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId(titleTestId);
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  // it('Verifica se a barra de pesquisa aparece na tela quando clicado no botão', () => {
  //   renderWithRouter(<Header />);
  //   const searchButton = screen.getByRole('img', { name: /search/i });
  //   userEvent.click(searchButton);

  //   const searchBar = screen.getByTestId('search-input');
  //   expect(searchBar).toBeInTheDocument();
  // });
  // it('Verifica se o texto do título é renderizado corretamente com base na rota atual', () => {
  //   renderWithRouter(<Header />, { initialEntries: ['/meals'] });
  //   const pageTitleMeals = screen.getByTestId(titleTestId);
  //   expect(pageTitleMeals.textContent).toBe('Meals');

  //   renderWithRouter(<Header />, { initialEntries: ['/drinks'] });
  //   const pageTitleDrinks = screen.getByTestId(titleTestId);
  //   expect(pageTitleDrinks.textContent).toBe('Drinks');
  // });
});
