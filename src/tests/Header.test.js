import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const searchInputDataTestId = 'search-input';

describe('Header Component', () => {
  it('Verifica a renderização do icone de Profile', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const profileIconElement = screen.getByAltText('Profile');
    expect(profileIconElement.src).toContain(profileIcon);
  });

  it('Verifica a renderização na rota /meals', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );
    const searchIconElement = screen.getByAltText('Search');
    expect(searchIconElement.src).toContain(searchIcon);
  });

  it('Verifica a renderização na rota /drinks', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );
    const searchIconElement = screen.getByAltText('Search');
    expect(searchIconElement.src).toContain(searchIcon);
  });

  it('Verifica a não renderização do Profile Icon das outras rotas', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.queryByAltText('Search')).toBeNull();

    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.queryByAltText('Search')).toBeNull();

    render(
      <MemoryRouter initialEntries={ ['/favorite-recipes'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.queryByAltText('Search')).toBeNull();
  });

  it('Verifica a visibilidade da barra de pesquisa', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );
    const searchIconElement = screen.getByAltText('Search');
    const searchBarElement = screen.queryByTestId(searchInputDataTestId);
    expect(searchBarElement).toBeNull();

    act(() => {
      userEvent.click(searchIconElement);
    });

    const updatedSearchBarElement = screen.queryByTestId(searchInputDataTestId);
    expect(updatedSearchBarElement).toBeInTheDocument();

    act(() => {
      userEvent.click(searchIconElement);
    });

    const hiddenSearchBarElement = screen.queryByTestId(searchInputDataTestId);
    expect(hiddenSearchBarElement).toBeNull();
  });
});
