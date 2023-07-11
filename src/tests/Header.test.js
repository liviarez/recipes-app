import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import Header from '../components/Header';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('Header', () => {
  const prflTopBtn = 'profile-top-btn';
  const srchTopBtn = 'search-top-btn';

  test('renders profile and search icons', () => {
    const { getByTestId } = render(
      <Router>
        <Header />
      </Router>,
    );

    const profileIcon = getByTestId(prflTopBtn);
    const searchIcon = getByTestId(srchTopBtn);

    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  test('renders page title based on current route', () => {
    const routes = [
      { path: '/meals', title: 'Meals' },
      { path: '/drinks', title: 'Drinks' },
      { path: '/profile', title: 'Profile' },
      { path: '/done-recipes', title: 'Done Recipes' },
      { path: '/favorite-recipes', title: 'Favorite Recipes' },
      { path: '/', title: '' },
    ];

    routes.forEach(({ path, title }) => {
      const { getByTestId } = render(
        <Router initialEntries={ [path] }>
          <Header />
        </Router>,
      );

      const pageTitle = getByTestId('page-title');
      expect(pageTitle.textContent).toBe(title);
    });
  });

  test('displays search input when search button is clicked', () => {
    const { getByTestId } = render(
      <Router>
        <Header />
      </Router>,
    );

    const searchButton = getByTestId(srchTopBtn);
    fireEvent.click(searchButton);

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('hides search input when search button is clicked again', () => {
    const { getByTestId, queryByTestId } = render(
      <Router>
        <Header />
      </Router>,
    );

    const searchButton = getByTestId(srchTopBtn);
    fireEvent.click(searchButton);

    fireEvent.click(searchButton);

    const searchInput = queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
  });

  test('redirects to profile screen and changes page title when profile button is clicked', () => {
    const mockHistoryPush = jest.fn();
    useHistory.mockReturnValueOnce({
      push: mockHistoryPush,
    });

    const { getByTestId } = render(
      <Router>
        <Header />
      </Router>,
    );

    const profileButton = getByTestId(prflTopBtn);
    fireEvent.click(profileButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/profile');

    const pageTitle = getByTestId('page-title');
    expect(pageTitle.textContent).toBe('Profile');
  });

  test('redirects to profile screen when profile button is clicked', () => {
    const mockHistoryPush = jest.fn();
    useHistory.mockReturnValueOnce({
      push: mockHistoryPush,
    });

    const { getByTestId } = render(
      <Router>
        <Header />
      </Router>,
    );

    const profileButton = getByTestId(prflTopBtn);
    fireEvent.click(profileButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/profile');
  });

  test('does not display search icon on non-meals/drinks routes', () => {
    const routes = [
      '/profile',
      '/done-recipes',
      '/favorite-recipes',
      '/search',
    ];

    routes.forEach((route) => {
      const { queryByTestId } = render(
        <Router initialEntries={ [route] }>
          <Header />
        </Router>,
      );

      const searchIcon = queryByTestId('search-top-btn');
      expect(searchIcon).not.toBeInTheDocument();
    });
  });
});
