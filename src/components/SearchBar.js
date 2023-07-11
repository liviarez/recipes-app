import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Fetch from '../functions/Fetch';

function SearchBar() {
  const location = useLocation();
  const [searchType, setSearchType] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const frstLetter = 'first-letter';

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const isDrinksPage = () => location.pathname === '/drinks';

  const handleSearch = () => {
    if (searchType === frstLetter && searchInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    let endpoint = '';

    if (isDrinksPage()) {
      if (searchType === 'ingredient') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (searchType === 'name') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else if (searchType === frstLetter) {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
      }
    } else if (searchType === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    } else if (searchType === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    } else if (searchType === frstLetter) {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
    }

    Fetch(endpoint);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        data-testid="search-input"
        value={ searchInput }
        onChange={ handleSearchInputChange }
      />
      <div>
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            id="ingredient-search"
            name="search-type"
            value="ingredient"
            checked={ searchType === 'ingredient' }
            onChange={ handleSearchTypeChange }
            data-testid="ingredient-search-radio"
          />
          Buscar Por Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            id="name-search"
            name="search-type"
            value="name"
            checked={ searchType === 'name' }
            onChange={ handleSearchTypeChange }
            data-testid="name-search-radio"
          />
          Buscar por nome
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            id="first-letter-search"
            name="search-type"
            value="first-letter"
            checked={ searchType === 'first-letter' }
            onChange={ handleSearchTypeChange }
            data-testid="first-letter-search-radio"
          />
          Buscar pela primeira letra
        </label>
      </div>
      <button type="button" onClick={ handleSearch } data-testid="exec-search-btn">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
