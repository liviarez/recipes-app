import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const idReceita = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  const [recipe, setRecipe] = useState([]);

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
      const test = pathname.includes('meals');
      const recipeData = test ? responseJson.meals[0] : responseJson.drinks[0];
      setRecipe(recipeData);
    };
    fetchRecipe();
  }, [idReceita, pathname]);

  console.log(recipe);
  const strName = type === 'meals' ? 'strMeal' : 'strDrink';
  const strThumb = type === 'meals' ? 'strMealThumb' : 'strDrinkThumb';

  const ingredients = [];
  const measures = [];
  const magicNumber = 20;
  for (let i = 1; i <= magicNumber; i += 1) {
    if (recipe[`strIngredient${i}`] !== null && recipe[`strIngredient${i}`] !== '') {
      ingredients.push(recipe[`strIngredient${i}`]);
    }
    if (recipe[`strMeasure${i}`] !== null && recipe[`strMeasure${i}`] !== '') {
      measures.push(recipe[`strMeasure${i}`]);
    }
  }

  return (
    <div>
      <h1 data-testid="recipe-title">
        {' '}
        {recipe[strName]}
        {' '}
      </h1>
      <img src={ recipe[strThumb] } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      <div>
        {ingredients.map((ingredient, index) => (
          <div key={ index }>
            <label
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              <input
                id={ ingredient }
                type="checkbox"
              />
              {ingredient}
              {' '}
              {measures[index]}
            </label>
          </div>
        ))}
      </div>

      <hp data-testid="instructions">{recipe.strInstructions}</hp>
      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favoritar
      </button>
      <button type="button" disabled data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}
