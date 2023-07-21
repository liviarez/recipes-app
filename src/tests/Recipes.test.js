import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Recipes from '../components/Recipes';

describe('Testando Recipes', () => {
  it('Verifica se renderiza meals corretamente', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Recipes />
      </MemoryRouter>,
    );

    const beef = await screen.findByTestId('Beef-category-filter');
    expect(beef).toBeInTheDocument();
  });

  it('Verifica se renderiza drinks corretamente', async () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Recipes />
      </MemoryRouter>,
    );

    const drinks = await screen.findByTestId('0-recipe-card');
    expect(drinks).toBeInTheDocument();
  });
});
