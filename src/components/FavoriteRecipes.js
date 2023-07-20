import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState('All');
  const [listFiltered, setListFiltered] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const favoritedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setRecipes(favoritedRecipes);
    setListFiltered(favoritedRecipes);
  }, []);

  const handleButtonFilter = (type) => {
    const filteredRecipes = recipes.filter((recipe) => recipe.type === type);
    setListFiltered(filteredRecipes);
  };

  const copyLink = ({ target: { dataset: { url } } }) => {
    copy(`http://localhost:3000/${url}`);
    setCopied(true);
  };

  const handleFavorite = (index) => {
    const storageCopy = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const fav = storageCopy.filter((element) => element.id !== index.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    setListFiltered(fav);
  };

  return (
    <div>
      <Header />
      <section>
        <button
          onClick={ () => setListFiltered(recipes) }
          data-testid="filter-by-all-btn"
        >
          <img src={ searchIcon } alt="search icon" />
          All
        </button>
        <button
          onClick={ () => handleButtonFilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          <img src={ drinkIcon } alt="drink icon" />
          Drinks
        </button>
        <button
          onClick={ () => handleButtonFilter('meal') }
          data-testid="filter-by-meal-btn"
        >
          <img src={ mealIcon } alt="meal icon" />
          Meals
        </button>
      </section>
      <main>
        {
          listFiltered.filter((food) => {
            switch (recipes) {
            case 'meals': return food.type === 'meal';
            case 'drinks': return food.type === 'drink';
            default: return food;
            }
          }).map((recipe, index) => (
            <div key={ index }>

              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </h2>
                <img
                  height="100px"
                  src={ recipe.image }
                  alt={ recipe.id }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
                {recipe.alcoholicOrNot}
              </p>
              <span data-testid={ `${index}-horizontal-done-date` }>
                {recipe.doneDate}
              </span>
              <img
                role="presentation"
                src={ shareIcon }
                alt="share"
                data-url={ `${recipe.type}s/${recipe.id}` }
                onClick={ copyLink }
                data-testid={ `${index}-horizontal-share-btn` }
              />
              <button
                type="button"
                onClick={ () => handleFavorite(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite"
                />
              </button>
            </div>
          ))
        }
      </main>
      {copied && <span>Link copied!</span>}
    </div>
  );
}
