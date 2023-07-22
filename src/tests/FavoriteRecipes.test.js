import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../components/FavoriteRecipes';

describe('Testa a página FavoriteRecipes', () => {
  it('Renderiza a página FavoriteRecipes', () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it('Testa os botões de filtro', () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(allBtn);
    userEvent.click(mealBtn);
    userEvent.click(drinkBtn);

    expect(allBtn).toHaveTextContent('All');
    expect(mealBtn).toHaveTextContent('Meals');
    expect(drinkBtn).toHaveTextContent('Drinks');
  });
});
