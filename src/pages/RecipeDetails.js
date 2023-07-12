import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import Fetch from '../functions/Fetch';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const { idReceita } = useParams();
  const { path } = useRouteMatch();
  const type = path.startsWith('/drinks') ? 'drinks' : 'meals';

  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasure] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [validationBtn, setValidationBtn] = useState(true);
  const [validationCopy, setValidationCopy] = useState(false);

  const recipeStarted = useCallback(async () => {
    // localStorage.clear();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || []; // pega no local storage
    const validation = doneRecipes.some((e) => e?.id === Number(idReceita));
    setValidationBtn(!validation);
  }, [idReceita]);

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
  }, [idReceita, recipeStarted, type]);

  // console.log(recommendation);

  const history = useHistory();
  const onClickStart = () => {
    history.push(`/${type}/${idReceita}/in-progress`);
  };

  const onClickShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${idReceita}`);
    setValidationCopy(true);
  };

  const onClickFavorite = () => {
    const favList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (!favList.some((e) => e?.id === Number(idReceita))) {
      if (type === 'meals') {
        favList.push({
          id: recipe[0].idMeal,
          type: 'meal',
          nationality: recipe[0].strArea,
          category: recipe[0].strCategory,
          alcoholicOrNot: '',
          name: recipe[0].strMeal,
          image: recipe[0].strMealThumb,
        });
      }
      if (type === 'drinks') {
        favList.push({
          id: recipe[0].idDrink,
          type: 'drink',
          nationality: '',
          category: recipe[0].strCategory,
          alcoholicOrNot: recipe[0].strAlcoholic,
          name: recipe[0].strDrink,
          image: recipe[0].strDrinkThumb,
        });
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify(favList));
    }
  };

  return (
    <div className="screen">
      {recipe.length === 0 && <h1>Carregando...</h1>}
      {recipe.length > 0 && type === 'meals'
        && (
          <div>
            <button
              data-testid="share-btn"
              onClick={ () => onClickShare() }
            >
              <img src={ shareIcon } alt="Share Icon" />
            </button>
            {
              validationCopy && <p>Link copied!</p>
            }
            <button
              data-testid="favorite-btn"
              onClick={ () => onClickFavorite() }
            >
              <img src={ favoriteIcon } alt="Favorite Icon" />
            </button>
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
                    onClick={ () => onClickStart() }
                  >
                    {
                      JSON.parse(localStorage.getItem('inProgressRecipes')) || []
                        ? 'Continue Recipe'
                        : 'Start Recipe'
                    }
                  </button>
                )
            }
          </div>
        )}
      {recipe.length > 0 && type === 'drinks'
        && (
          <div>
            <button
              data-testid="share-btn"
              onClick={ () => onClickShare() }
            >
              <img src={ shareIcon } alt="Share Icon" />
            </button>
            {
              validationCopy && <p>Link copied!</p>
            }
            <button
              data-testid="favorite-btn"
              onClick={ () => onClickFavorite() }
            >
              <img src={ favoriteIcon } alt="Favorite Icon" />
            </button>
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
                    onClick={ () => onClickStart() }
                  >
                    {
                      JSON.parse(localStorage.getItem('inProgressRecipes')) || []
                        ? 'Continue Recipe'
                        : 'Start Recipe'
                    }
                  </button>
                )
            }
          </div>
        )}
    </div>

  );
}

export default RecipeDetails;
