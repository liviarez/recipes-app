import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../helpers/renderWithRouter';
import RecipeInProgress from '../components/RecipeInProgress';

describe('Testa o componente RecipeInProgress', () => {
  it('Verifica se os elementos estão na tela', async () => {
    renderWithRouter(<RecipeInProgress />, { route: '/meals/52771/in-progress' });

    await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument());

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();

    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton).toBeInTheDocument();
  });
});
