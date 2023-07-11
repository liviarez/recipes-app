import React from 'react';

function SearchBar() {
  return (
    <div>
      <h1>Teste</h1>
      <input
        type="text"
        placeholder="Search..."
        data-testid="search-input"
      />
      <div>
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            id="ingredient-search"
            name="search-type"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Search by Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            id="name-search"
            name="search-type"
            value="name"
            data-testid="name-search-radio"
          />
          Search by Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            id="first-letter-search"
            name="search-type"
            value="first-letter"
            data-testid="first-letter-search-radio"
          />
          Search by First Letter
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
