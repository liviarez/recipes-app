import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import Fetch from '../functions/Fetch';
import shareIcon from '../images/shareIcon.svg';
import noFavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import RecipeMeals from '../components/RecipeMeals';
import RecipeDrinks from '../components/RecipeDrinks';

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
  const [favOrNo, setFavOrNo] = useState(true);

  const recipeStarted = useCallback(async () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || []; // pega no local storage
    const validation = doneRecipes.some((e) => e?.id === idReceita);
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
      const favList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      console.log(favList);
      if (favList.some((e) => e?.id === idReceita)) {
        setFavOrNo(false);
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

  // localStorage.clear();
  const onClickFavorite = () => {
    const favList = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    console.log(favList[0]?.id);
    console.log(idReceita);
    if (favList.filter((e) => e?.id === idReceita).length === 0) {
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
      setFavOrNo(false);
    } else {
      const newFav = favList.filter((e) => e.id !== idReceita);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
      setFavOrNo(true);
    }
  };

  return (
    <div className="screen">
      <RecipeMeals
        recipe={ recipe }
        type={ type }
        onClickShare={ onClickShare }
        shareIcon={ shareIcon }
        validationCopy={ validationCopy }
        onClickFavorite={ onClickFavorite }
        favOrNo={ favOrNo }
        noFavoriteIcon={ noFavoriteIcon }
        favoriteIcon={ favoriteIcon }
        ingredients={ ingredients }
        measures={ measures }
        recommendation={ recommendation }
        validationBtn={ validationBtn }
        onClickStart={ onClickStart }
      />
      <RecipeDrinks
        recipe={ recipe }
        type={ type }
        onClickShare={ onClickShare }
        shareIcon={ shareIcon }
        validationCopy={ validationCopy }
        onClickFavorite={ onClickFavorite }
        favOrNo={ favOrNo }
        noFavoriteIcon={ noFavoriteIcon }
        favoriteIcon={ favoriteIcon }
        ingredients={ ingredients }
        measures={ measures }
        recommendation={ recommendation }
        validationBtn={ validationBtn }
        onClickStart={ onClickStart }
      />
    </div>

  );
}

export default RecipeDetails;
