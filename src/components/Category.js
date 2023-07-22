import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fetch from '../functions/Fetch';

export default function Recipes(props) {
  const { setRecipes } = props;
  const [categories, setCategories] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const location = useLocation();
  const maxCategories = 5;

  const isDrinksCategoryRoute = location.pathname === '/drinks' ? 'drinks' : 'meals';

  const url = location.pathname === '/drinks'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await Fetch(url);
      const fetchCategoriesAPI = response[isDrinksCategoryRoute];
      const filterCategory = fetchCategoriesAPI.slice(0, maxCategories);
      setCategories(filterCategory);
    };
    fetchCategory();
  }, [isDrinksCategoryRoute, location.pathname, url]);

  const handleCategoryButton = async ({ target }) => {
    const { name } = target;
    const magicNum = 12;
    const correctLocation = location.pathname === '/drinks'
      ? 'www.thecocktaildb.com' : 'www.themealdb.com';

    if (isFilterActive) {
      const response = await Fetch(`https://${correctLocation}/api/json/v1/1/search.php?s=`);
      const twelveRecipes = response[isDrinksCategoryRoute].slice(0, magicNum);
      setRecipes(twelveRecipes);
    } else {
      if (name === 'All') {
        const response = await Fetch(`https://${correctLocation}/api/json/v1/1/search.php?s=`);
        const allRecipes = response[isDrinksCategoryRoute].slice(0, magicNum);
        setRecipes(allRecipes);
      } if (location.pathname === '/meals') {
        const response = await Fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        const twelveMeals = response.meals.slice(0, magicNum);
        setRecipes(twelveMeals);
      } else {
        const response = await Fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
        const twelveDrinks = response.drinks.slice(0, magicNum);
        setRecipes(twelveDrinks);
      }
    }

    setIsFilterActive(!isFilterActive);
  };

  return (
    <div className="button">
      <button
        type="button"
        name="All"
        onClick={ handleCategoryButton }
        data-testid="All-category-filter"
      >
        All
      </button>
      {categories.map((categoryName, index) => (
        <button
          key={ index }
          name={ categoryName.strCategory }
          onClick={ handleCategoryButton }
          data-testid={ `${categoryName.strCategory}-category-filter` }
        >
          {categoryName.strCategory}
        </button>
      ))}
    </div>
  );
}

Recipes.propTypes = {
  setRecipes: PropTypes.func.isRequired,
};
