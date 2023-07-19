import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/RecipeInProgress.css';
import copy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const [lineThroughChecked, setLineThroughChecked] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [showCopyLink, setShowCopyLink] = useState(false);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const idReceita = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  const strId = type === 'meals' ? 'idMeal' : 'idDrink';

  useEffect(() => {
    const fetchRecipe = async () => {
      let dataRequest;
      if (pathname.includes('meals')) {
        dataRequest = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`,
        );
      } else {
        dataRequest = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`,
        );
      }
      const responseJson = await dataRequest.json();
      const endPathname = pathname.includes('meals');
      const recipeData = endPathname ? responseJson.meals[0] : responseJson.drinks[0];
      setRecipe(recipeData);
    };
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavoriteRecipe = favorite.some((fav) => fav.id === idReceita);
    console.log(isFavoriteRecipe);
    setIsFavorite(isFavoriteRecipe);
    fetchRecipe();
  }, [idReceita, pathname]);

  // Load
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (savedProgress && savedProgress[idReceita]) {
      setLineThroughChecked(savedProgress[idReceita]);
    }
  }, [idReceita]);

  // Save
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    savedProgress[idReceita] = lineThroughChecked;
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedProgress));
  }, [idReceita, lineThroughChecked]);

  const strName = type === 'meals' ? 'strMeal' : 'strDrink';
  const strThumb = type === 'meals' ? 'strMealThumb' : 'strDrinkThumb';
  const strType = type === 'meals' ? 'meal' : 'drink';

  const ingredients = [];
  const measures = [];
  const magicNumber = 10;
  for (let i = 1; i <= magicNumber; i += 1) {
    if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
      ingredients.push(recipe[`strIngredient${i}`]);
    }
    if (recipe[`strMeasure${i}`] !== null && recipe[`strMeasure${i}`] !== '') {
      measures.push(recipe[`strMeasure${i}`]);
    }
  }

  const handleCheckboxChange = (index) => {
    const newLineThroughChecked = [...lineThroughChecked];
    newLineThroughChecked[index] = !newLineThroughChecked[index];
    setLineThroughChecked(newLineThroughChecked);
  };

  const handleCopyLink = () => {
    const anotherMagicNumber = 3000;
    copy(`http://localhost:3000/${type}/${idReceita}`);
    setShowCopyLink(true);
    setTimeout(() => {
      setShowCopyLink(false);
    }, anotherMagicNumber);
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFavorite = {
      id: recipe[strId],
      type: strType,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[strName],
      image: recipe[strThumb],
    };
    const isFavoriteRecipe = favoriteRecipes
      .some((favorite) => favorite.id === newFavorite.id);
    if (isFavoriteRecipe) {
      const newFavoriteRecipes = favoriteRecipes
        .filter((favorite) => favorite.id !== newFavorite.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setIsFavorite(false);
    } else {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, newFavorite]));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const allChecked = lineThroughChecked.every((isChecked) => isChecked);
    setAllIngredientsChecked(allChecked);
  }, [lineThroughChecked]);

  return (
    <div>
      <h1 data-testid="recipe-title">
        {recipe[strName]}
      </h1>
      <img
        src={ recipe[strThumb] }
        alt="recipe"
        data-testid="recipe-photo"
        height="100px"
      />
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      <div>
        {ingredients.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={ lineThroughChecked[index] ? 'line-through' : '' }
          >
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <input
                id={ ingredient }
                type="checkbox"
                checked={ lineThroughChecked[index] || false }
                onChange={ () => handleCheckboxChange(index) }
              />
              {ingredient}
              {' '}
              {measures[index]}
            </label>
          </div>
        ))}
      </div>
      <br />
      <label htmlFor="instructions" data-testid="instructions-label">
        Instruções
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </label>
      <p>{showCopyLink ? 'Link copied!' : ''}</p>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleCopyLink }
      >
        Compartilhar
      </button>
      <button
        type="button"
        // data-testid="favorite-btn"
        onClick={ handleFavorite }
      >
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
          alt="favorite"
        />
        {isFavorite ? 'Desfavoritar' : 'Favoritar'}
      </button>
      <button
        type="button"
        disabled={ !allIngredientsChecked }
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}
