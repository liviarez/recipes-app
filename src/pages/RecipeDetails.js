import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import Fetch from '../functions/Fetch';

function RecipeDetails() {
  const { idReceita } = useParams();
  const { path } = useRouteMatch();
  const type = path.startsWith('/drinks') ? 'drinks' : 'meals';

  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasure] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (type === 'meals') {
        const data = await Fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
        console.log(data);
        const ingredient = Object.keys(data.meals[0])
          .filter((key) => key.startsWith('strIngredient') && data.meals[0][key])
          .map((key) => data.meals[0][key]);
        const measure = Object.keys(data.meals[0])
          .filter((key) => key.startsWith('strMeasure') && data.meals[0][key])
          .map((key) => data.meals[0][key]);
        setIngredients(ingredient);
        setMeasure(measure);
        setRecipe(data.meals);
      }
      if (type === 'drinks') {
        const data = await Fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
        console.log(data);
        const ingredient = Object.keys(data.drinks[0])
          .filter((key) => key.startsWith('strIngredient') && data.drinks[0][key])
          .map((key) => data.drinks[0][key]);
        const measure = Object.keys(data.drinks[0])
          .filter((key) => key.startsWith('strMeasure') && data.drinks[0][key])
          .map((key) => data.drinks[0][key]);
        setIngredients(ingredient);
        setMeasure(measure);
        setRecipe(data.drinks);
      }
    };

    fetchRecipe();
  }, [idReceita, type]);

  // console.log(recipe);

  return (
    <div>
      {recipe.length === 0 && <h1>Carregando...</h1>}
      {recipe.length > 0 && type === 'meals'
        && (
          <div>
            <p data-testid="recipe-title">{ recipe[0].strMeal }</p>
            <p data-testid="recipe-category">{ recipe[0].strCategory }</p>
            <div>
              {
                ingredients.map((e, index) => (
                  <p
                    key={ e }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { e }
                    {': '}
                    { measures[index] }
                  </p>
                ))
              }
            </div>
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
            <p data-testid="recipe-title">{ recipe[0].strDrink }</p>
            <p data-testid="recipe-category">{ recipe[0].strAlcoholic }</p>
            <div>
              {
                ingredients.map((e, index) => (
                  <p
                    key={ e }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { e }
                    {': '}
                    { measures[index] }
                  </p>
                ))
              }
            </div>
            <p data-testid="instructions">{ recipe[0].strInstructions }</p>
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
