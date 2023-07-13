import React from 'react';
import propTypes from 'prop-types';

class RecipeMeals extends React.Component {
  render() {
    const {
      recipe,
      type,
      onClickShare,
      shareIcon,
      validationCopy,
      onClickFavorite,
      favOrNo,
      noFavoriteIcon,
      favoriteIcon,
      ingredients,
      measures,
      recommendation,
      validationBtn,
      onClickStart,
    } = this.props;
    return (
      <>
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
              src={
                favOrNo
                  ? noFavoriteIcon
                  : favoriteIcon
              }
            >
              {
                favOrNo
                  ? <img src={ noFavoriteIcon } alt="No Favorite Icon" />
                  : <img src={ favoriteIcon } alt="Favorite Icon" />
              }
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
      </>
    );
  }
}

RecipeMeals.propTypes = {
  recipe: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  onClickShare: propTypes.func.isRequired,
  shareIcon: propTypes.string.isRequired,
  validationCopy: propTypes.bool.isRequired,
  onClickFavorite: propTypes.func.isRequired,
  favOrNo: propTypes.string.isRequired,
  noFavoriteIcon: propTypes.string.isRequired,
  favoriteIcon: propTypes.string.isRequired,
  ingredients: propTypes.string.isRequired,
  measures: propTypes.string.isRequired,
  recommendation: propTypes.string.isRequired,
  validationBtn: propTypes.bool.isRequired,
  onClickStart: propTypes.func.isRequired,
};

export default RecipeMeals;
