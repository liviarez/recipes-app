import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Fetch from '../functions/Fetch';

export default function Recipes() {
  const [categories, setCategories] = useState([]);
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
      const filterCategory = fetchCategoriesAPI
        .slice(0, maxCategories);
      setCategories(filterCategory);
    };
    fetchCategory();
  }, [isDrinksCategoryRoute, location.pathname]);

  /*   const handleCategoryButton = async ({ target: { name } }) => {
    }; */
  return (
    <div className="button">
      {categories.map((categoryName, index) => (
        <button
          key={ index }
          name={ categoryName.strCategory }
          /*     onClick={ handleCategoryButton } */
          data-testid={ `${categoryName.strCategory}-category-filter` }
        >
          {categoryName.strCategory}
        </button>
      ))}

    </div>
  );
}
