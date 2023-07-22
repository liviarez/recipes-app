import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Fetch from '../functions/Fetch';
import Category from './Category';

function Drinks() {
  const [recipes, setRecipes] = useState([]);

  const maxRecipes = 12;

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await Fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const fetchDrinksAPI = response.drinks;
      const filterDrinks = fetchDrinksAPI.slice(0, maxRecipes);
      setRecipes(filterDrinks);
    };
    fetchDrinks();
  }, []);

  return (
    <div>
      <Header />
      <Category setRecipes={ setRecipes } />
      {recipes.map((recipe, index) => (
        <div
          key={ recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
          className="drink"
        >
          <h1
            data-testid={ `${index}-card-name` }
          >
            {recipe.strDrink}

          </h1>
          <img
            alt=""
            src={ recipe.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            width={ 200 }
          />
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default Drinks;
