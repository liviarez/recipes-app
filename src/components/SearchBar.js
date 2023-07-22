import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Fetch from '../functions/Fetch';

function SearchBar() {
  const location = useLocation();
  const history = useHistory();
  const [searchType, setSearchType] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const frstLetter = 'first-letter';
  const [recipes, setRecipes] = useState([]);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const isDrinksPage = () => location.pathname === '/drinks';

  const handleSearch = async () => {
    if (searchType === frstLetter && searchInput.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    let endpoint = '';
    let recipeType = '';

    if (isDrinksPage()) {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/';
      recipeType = 'drinks';
    } else {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/';
      recipeType = 'meals';
    }

    if (searchType === 'ingredient') {
      endpoint += `filter.php?i=${searchInput}`;
    } else if (searchType === 'name') {
      endpoint += `search.php?s=${searchInput}`;
    } else if (searchType === frstLetter) {
      endpoint += `search.php?f=${searchInput}`;
    }

    const response = await Fetch(endpoint);
    const doze = '12';

    if (response[recipeType] && (response[recipeType].length === 1
      || response[recipeType].length === doze)) {
      const recipeId = response[recipeType][0].idDrink || response[recipeType][0].idMeal;
      history.push(`/${recipeType}/${recipeId}`);
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setRecipes(response[recipeType] || []);
    }
  };

  const doze = '12';

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
      {recipes.length > 0 && (
        <div>
          {recipes.slice(0, doze).map((recipe, index) => (
            <div
              key={ recipe.idMeal || recipe.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt="Recipe"
                data-testid={ `${index}-card-img` }
                width={ 200 }
              />
              <p data-testid={ `${index}-card-name` }>
                {recipe.strMeal || recipe.strDrink}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
