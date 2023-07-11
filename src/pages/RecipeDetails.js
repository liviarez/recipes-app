import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import Fetch from '../functions/Fetch';

function RecipeDetails() {
  const { idReceita } = useParams();
  const { path } = useRouteMatch();
  const type = path.startsWith('/drinks') ? 'drinks' : 'meals';

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (type === 'meals') {
        const data = await Fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
        console.log(data);
        setRecipe(data.meals);
      }
      if (type === 'drinks') {
        const data = await Fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
        console.log(data);
        setRecipe(data.drinks);
      }
    };

    fetchRecipe();
  }, []);

  // console.log(recipe);

  return (
    <div>
      {recipe.length === 0 && <h1>Carregando...</h1>}
      {recipe.length > 0 && type === 'meals'
        && (
          <div>
            <p data-testid="recipe-title">{ recipe[0].strMeal }</p>
            <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
            {/* <p
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { recipe[0].strMeal }

            </p> */}
            <p data-testid="instructions">{ recipe[0].strInstructions }</p>
            <img
              alt="foto drink"
              src={ recipe[0].strMealThumb }
              data-testid="recipe-photo"
            />
            <iframe
              width="560"
              height="315"
              src={ recipe[0].strYoutube }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
                autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              data-testid="video"
            />
          </div>
        )}
      {recipe.length > 0 && type === 'drinks'
        && (
          <div>
            <img
              alt="foto drink"
              src={ recipe[0].strDrinkThumb }
              data-testid="recipe-photo"
            />
          </div>
        )}
    </div>

  );
}

export default RecipeDetails;
