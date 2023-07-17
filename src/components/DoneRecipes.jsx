import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipe, setDoneRecipe] = useState([]);
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  // const history = useHistory();

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipe(doneRecipesStorage);
  }, []);

  const filterDoneRecipes = doneRecipe
    .filter(({ type }) => filter === 'all' || type === filter);

  const copyLink = ({ target: { dataset: { url } } }) => {
    copy(`http://localhost:3000/${url}`);
    setCopied(true);
  };

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          name="meal"
          onClick={ () => setFilter('meal') }
        >
          Meal
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="drink"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>

      {filterDoneRecipes.map(({
        alcoholicOrNot,
        category,
        doneDate,
        id,
        image,
        name,
        nationality,
        tags,
        type,
      }, index) => (
        <div key={ index }>
          <Link to={ `/${type}s/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>
              {name}
            </h2>
          </Link>
          <Link to={ `/${type}s/${id}` }>
            <img
              src={ image }
              alt={ name }
              height="100px"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
          </p>
          <div>
            { tags.map((tagName, itemIndex) => (
              <span
                key={ itemIndex }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                -
                { tagName }
              </span>
            )) }
          </div>
          <span data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</span>
          <div>
            <img
              role="presentation"
              src={ shareIcon }
              alt="share"
              data-url={ `${type}s/${id}` }
              onClick={ copyLink }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </div>
          { copied ? <span> Link copied! </span> : null }
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
