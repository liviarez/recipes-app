import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Fetch from '../functions/Fetch';
import Category from './Category';

function Meals() {
  const [recipes, setRecipes] = useState([]);

  const maxRecipes = 12;

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await Fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const fetchMealAPI = response.meals;
      const filterMeals = fetchMealAPI.slice(0, maxRecipes);
      setRecipes(filterMeals);
    };
    fetchMeals();
  }, []);

  return (
    <div>
      <Header />
      <Category setRecipes={ setRecipes } />
      {
        recipes.map((recipe, index) => (
          <div
            key={ recipe.idMeal }
            data-testid={ `${index}-recipe-card` }
            className="meal"
          >
            <h1
              data-testid={ `${index}-card-name` }
            >
              {recipe.strMeal}

            </h1>
            <img
              alt=""
              src={ recipe.strMealThumb }
              data-testid={ `${index}-card-img` }
              width={ 200 }
            />
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default Meals;
