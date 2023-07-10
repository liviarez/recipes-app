import React from 'react';

// 37 - Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com suas respectivas quantidades e instruções
// Observações técnicas
// Verifica se os atributos data-testid estão presentes na tela:

// A foto deve possuir o atributo data-testid="recipe-photo"; ✅
// O título deve possuir o atributo data-testid="recipe-title"; ✅
// O botão de compartilhar deve possuir o atributo data-testid="share-btn"; ✅
// O botão de favoritar deve possuir o atributo data-testid="favorite-btn"; ✅
// O texto da categoria deve possuir o atributo data-testid="recipe-category"; ✅
// O elemento de instruções deve possuir o atributo data-testid="instructions"; ✅
// O botão para finalizar a receita deve possuir o atributo data-testid="finish-recipe-btn".✅

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
