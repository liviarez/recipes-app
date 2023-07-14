import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouter } from '../helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';

const testIdSearchInput = 'search-input';
const searchBtn = 'exec-search-btn';
const mockCardName = '0-card-name';

describe('Verifica as funcionalidades do componente SearchBar', () => {
  it('Verifica se o campo de pesquisa é renderizado na tela', () => {
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeInTheDocument();
  });

  it('Verifica se os tipos de busca são renderizados corretamente', () => {
    renderWithRouter(<SearchBar />);
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    expect(ingredientSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(firstLetterSearch).toBeInTheDocument();
  });

  it('Verifica se a função de busca é chamada corretamente', () => {
    renderWithRouter(<SearchBar />);
    const searchButton = screen.getByTestId(searchBtn);
    const searchInput = screen.getByTestId(testIdSearchInput);

    userEvent.type(searchInput, 'banana');
    userEvent.click(searchButton);
  });

  it('Verifica se a função de busca por ingrediente é chamada corretamente', async () => {
    renderWithRouter(<SearchBar />);
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const searchButton = screen.getByTestId(searchBtn);
    const searchInput = screen.getByTestId(testIdSearchInput);

    userEvent.click(ingredientSearch);
    userEvent.type(searchInput, 'banana');
    userEvent.click(searchButton);

    const cardName = await screen.findByTestId(mockCardName);

    expect(cardName.textContent).toBe('Banana Pancakes');
  });

  it('Verifica se a função de busca por nome é chamada corretamente', async () => {
    renderWithRouter(<SearchBar />);
    const nameSearch = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId(searchBtn);
    const searchInput = screen.getByTestId(testIdSearchInput);

    userEvent.click(nameSearch);
    userEvent.type(searchInput, 'chocolate');
    userEvent.click(searchButton);

    const cardName = await screen.findByTestId(mockCardName);

    expect(cardName.textContent).toBe('Chocolate Gateau');
  });

  it('Verifica se a função de busca por primeira letra é chamada corretamente', async () => {
    renderWithRouter(<SearchBar />);
    const firstLetterSearch = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId(searchBtn);
    const searchInput = screen.getByTestId(testIdSearchInput);

    userEvent.click(firstLetterSearch);
    userEvent.type(searchInput, 'a');
    userEvent.click(searchButton);

    const cardName = await screen.findByTestId(mockCardName);

    expect(cardName.textContent).toBe('Apple Frangipan Tart');
  });

  it('Verifica se a barra de pesquisa aparece após clicar no botão de busca', () => {
    renderWithRouter(<SearchBar />);
    const searchButton = screen.getByTestId(searchBtn);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(testIdSearchInput);
    expect(searchInput).toBeVisible();
  });
  // it('Verifica se o alerta é exibido corretamente para pesquisa com apenas um caractere', () => {
  //   jest.spyOn(global, 'alert');
  //   global.alert.mockImplementation(() => {});
  //   renderWithRouter(<SearchBar />);
  //   const searchButton = screen.getByTestId('exec-search-btn');

  //   act(() => {
  //     userEvent.type(screen.getByTestId('search-input'), 'abc');
  //     userEvent.click(searchButton);
  //     expect(global.alert).toBeCalled();
  //   });

  //   alertMock.mockRestore();
  // });
});
