import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import RecipeInProgress from '../components/RecipeInProgress';

const endPoint = '/meals/52771/in-progress';
const dataTitle = 'recipe-title';

describe('Testa o componente RecipeInProgress', () => {
  it('Verifica se os elementos estão na tela', async () => {
    renderWithRouter(<RecipeInProgress />, { route: endPoint });

    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument());

    const recipeTitle = screen.getByTestId(dataTitle);
    expect(recipeTitle).toBeInTheDocument();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
  });
  it('Verifica a renderização dos ingredientes', async () => {
    renderWithRouter(<RecipeInProgress />, { initialEntries: endPoint });

    await waitFor(() => expect(screen.getByTestId(dataTitle)).toBeInTheDocument());

    const ingredient1 = await screen.findAllByRole('checkbox');
    expect(ingredient1.length).toBe(10);
  });
  it('Verifica se os ingredientes estão sendo riscados', async () => {
    renderWithRouter(<RecipeInProgress />, { initialEntries: endPoint });

    await waitFor(() => expect(screen.getByTestId(dataTitle)).toBeInTheDocument());

    const ingredient1 = await screen.findAllByRole('checkbox');
    expect(ingredient1.length).toBe(10);

    userEvent.click(ingredient1[0]);
    expect(ingredient1[0].checked).toBe(true);
  });
});
