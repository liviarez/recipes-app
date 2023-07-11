import React from 'react';

export default function RecipeInProgress() {
  return (
    <div>
      <h1 data-testid="recipe-title">Recipe Title</h1>
      <img src="" alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-category">Recipe Category</h2>
      <h3 data-testid="instructions">Instructions</h3>
      <button
        type="button"
        disabled
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
    </div>
  );
}
