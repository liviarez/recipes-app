import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import SearchBar from '../components/SearchBar';

const testIdSearchInput = 'search-input';
const searchBtn = 'exec-search-btn';
const mockCardName = '0-card-name';
const testIdFirstLetter = 'first-letter-search-radio';

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
    const firstLetterSearch = screen.getByTestId(testIdFirstLetter);
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
    const firstLetterSearch = screen.getByTestId(testIdFirstLetter);
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

  it('Verifica se o alerta é exibido corretamente para pesquisa com apenas um caractere', async () => {
    const mockAlert = jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<SearchBar />);
    const searchButton = screen.getByTestId(searchBtn);
    expect(searchButton).toBeInTheDocument();

    act(() => {
      userEvent.type(screen.getByTestId(testIdSearchInput), 'abc');
      userEvent.click(searchButton);
    });
    await waitFor(() => expect(mockAlert).toHaveBeenCalled());
  });

  it('Verifica se o alerta é exibido corretamente para pesquisa com mais de um caractere', async () => {
    const mockAlert = jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<SearchBar />);
    const searchButton = screen.getByTestId(searchBtn);
    expect(searchButton).toBeInTheDocument();

    act(() => {
      userEvent.type(screen.getByTestId(testIdSearchInput), 'ab');
      userEvent.click(searchButton);
    });
    await waitFor(() => expect(mockAlert).toHaveBeenCalled());
  });

  it('Verifica se o alerta é exibido corretamente para pesquisa com nenhum caractere', async () => {
    const mockAlert = jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<SearchBar />);
    const searchButton = screen.getByTestId(searchBtn);
    expect(searchButton).toBeInTheDocument();

    act(() => {
      userEvent.type(screen.getByTestId(testIdSearchInput), '');
      userEvent.click(searchButton);
    });
    await waitFor(() => expect(mockAlert).toHaveBeenCalled());
  });
  it('Verifica se é exibido um alerta para a busca com mais de 1 caractere no modo de busca por primeira letra', async () => {
    global.alert = jest.fn();
    renderWithRouter(<SearchBar />);
    const firstLetterSearch = screen.getByTestId(testIdFirstLetter);
    const searchButton = screen.getByTestId(searchBtn);
    const searchInput = screen.getByTestId(testIdSearchInput);

    userEvent.click(firstLetterSearch);
    userEvent.type(searchInput, 'ab');
    userEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  it('Verifica se não é exibido um alerta para a busca com 1 caractere no modo de busca por primeira letra', async () => {
    global.alert = jest.fn();
    renderWithRouter(<SearchBar />);
    const firstLetterSearch = screen.getByTestId(testIdFirstLetter);
    const searchButton = screen.getByTestId(searchBtn);
    const searchInput = screen.getByTestId(testIdSearchInput);

    userEvent.click(firstLetterSearch);
    userEvent.type(searchInput, 'a');
    userEvent.click(searchButton);
    expect(global.alert).not.toHaveBeenCalled();
  });
});
