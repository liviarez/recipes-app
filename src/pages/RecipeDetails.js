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
  const [recommendation, setRecommendation] = useState([]);
  const [validationBtn, setValidationBtn] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (type === 'meals') {
        const six = 6;
        const data = await Fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
        const recommend = await Fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const randomRecipes = recommend.drinks.slice(0, six);
        const ingredient = Object.keys(data.meals[0])
          .filter((key) => key.startsWith('strIngredient') && data.meals[0][key])
          .map((key) => data.meals[0][key]);
        const measure = Object.keys(data.meals[0])
          .filter((key) => key.startsWith('strMeasure') && data.meals[0][key])
          .map((key) => data.meals[0][key]);
        setIngredients(ingredient);
        setMeasure(measure);
        setRecommendation(randomRecipes);
        setRecipe(data.meals);
      }
      if (type === 'drinks') {
        const six = 6;
        const data = await Fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`);
        const recommend = await Fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const randomRecipes = recommend.meals.slice(0, six);
        const ingredient = Object.keys(data.drinks[0])
          .filter((key) => key.startsWith('strIngredient') && data.drinks[0][key])
          .map((key) => data.drinks[0][key]);
        const measure = Object.keys(data.drinks[0])
          .filter((key) => key.startsWith('strMeasure') && data.drinks[0][key])
          .map((key) => data.drinks[0][key]);
        setIngredients(ingredient);
        setMeasure(measure);
        setRecommendation(randomRecipes);
        setRecipe(data.drinks);
      }
    };

    fetchRecipe();
  }, [idReceita, type]);

  // console.log(recommendation);

  return (
    <div className="screen">
      {recipe.length === 0 && <h1>Carregando...</h1>}
      {recipe.length > 0 && type === 'meals'
        && (
          <div>
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
                allow="accelerometer; autoplay;
                  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                data-testid="video"
              />
            </div>
            <div className="divRecommendation">
              {
                recommendation.map((e, index) => (
                  <div
                    data-testid={ `${index}-recommendation-card` }
                    key={ e.idDrink }
                    className="cardsRecommendation"
                  >
                    <img
                      alt="foto drink"
                      src={ e.strDrinkThumb }
                      data-testid="recipe-photo"
                      className="cardImg"
                    />
                    <p data-testid={ `${index}-recommendation-title` }>{ e.strDrink }</p>
                  </div>
                ))
              }
            </div>
            {
              validationBtn
                && (
                  <button
                    className="fixed-button"
                    data-testid="start-recipe-btn"
                  >
                    Start Recipe
                  </button>
                )
            }
          </div>
        )}
      {recipe.length > 0 && type === 'drinks'
        && (
          <div>
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
            <div className="divRecommendation">
              {
                recommendation.map((e, index) => (
                  <div
                    data-testid={ `${index}-recommendation-card` }
                    key={ e.idMeal }
                    className="cardsRecommendation"
                  >
                    <img
                      alt="foto Meal"
                      src={ e.strMealThumb }
                      data-testid="recipe-photo"
                      className="cardImg"
                    />
                    <p data-testid={ `${index}-recommendation-title` }>{ e.strMeal }</p>
                  </div>
                ))
              }
            </div>
            {
              validationBtn
                && (
                  <button
                    className="fixed-button"
                    data-testid="start-recipe-btn"
                  >
                    Start Recipe
                  </button>
                )
            }
          </div>
        )}
    </div>

  );
}

export default RecipeDetails;
