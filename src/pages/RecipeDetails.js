import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

function RecipeDetails() {
  const { idReceita } = useParams();
  const { path } = useRouteMatch();
  const type = path.startsWith('/drinks') ? 'drinks' : 'meals';

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (type === 'meals') {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`)
          .then((response) => response.json());
        setRecipe(data);
        console.log(type);
      }
      if (type === 'drinks') {
        const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceita}`)
          .then((response) => response.json());
        setRecipe(data);
        console.log(type);
      }
    };

    fetchRecipe();
  }, []);

  console.log(recipe);

  return (
    <div>
      { idReceita }
    </div>
  );
}

export default RecipeDetails;
