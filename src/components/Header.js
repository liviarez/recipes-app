import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [searchVisible, setSearchVisible] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible);
  };

  const renderSearchIcon = () => {
    if (location.pathname === '/meals' || location.pathname === '/drinks') {
      return (
        <button
          type="button"
          onClick={ handleSearchClick }
          style={ { border: 'none', background: 'none', cursor: 'pointer' } }
        >
          <img
            src={ searchIcon }
            alt="Search"
            data-testid="search-top-btn"
          />
        </button>
      );
    }
  };

  return (
    <header>
      <button
        type="button"
        onClick={ handleProfileClick }
        style={ { border: 'none', background: 'none', cursor: 'pointer' } }
      >
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </button>
      {renderSearchIcon()}
      <h1 data-testid="page-title">{getPageTitle()}</h1>
      {searchVisible && <SearchBar />}
    </header>
  );
}

export default Header;
