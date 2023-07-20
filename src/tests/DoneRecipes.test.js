import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import DoneRecipes from '../components/DoneRecipes';

const btnAllFilter = 'filter-by-all-btn';
const btnMealFilter = 'filter-by-meal-btn';
const btnDrinkFilter = 'filter-by-drink-btn';
const shareBtn = '0-horizontal-share-btn';
const shareDrink = '1-horizontal-share-btn';

const recipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Verifica as funcionalidades do componente DoneRecipes', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Testa se a pagina contem um header', () => {
    renderWithRouter(<DoneRecipes />);
    const header = screen.getByTestId('header-container');
    expect(header).toBeInTheDocument();
  });

  it('Testa botões de filtro na pagina', () => {
    renderWithRouter(<DoneRecipes />);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    const btnAll = screen.getByTestId(btnAllFilter);
    expect(btnAll).toBeInTheDocument();
    const btnMeal = screen.getByTestId(btnMealFilter);
    expect(btnMeal).toBeInTheDocument();
    const btnDrink = screen.getByTestId(btnDrinkFilter);
    expect(btnDrink).toBeInTheDocument();
  });

  it('Testa se a lista de drinks feitos é renderizado na página', () => {
    renderWithRouter(<DoneRecipes />);
    const drinkImg = screen.getByTestId('1-horizontal-image');
    expect(drinkImg).toBeInTheDocument();
    const drinkCategory = screen.getByTestId('1-horizontal-top-text');
    expect(drinkCategory).toBeInTheDocument();
    expect(drinkCategory.textContent).toBe('Alcoholic');
    const drinkTitle = screen.getByTestId('1-horizontal-name');
    expect(drinkTitle).toBeInTheDocument();
    expect(drinkTitle.textContent).toBe('Aquamarine');
    const drinkShareBtn = screen.getByTestId(shareDrink);
    expect(drinkShareBtn).toBeInTheDocument();
  });

  it('Testa se a lista de comidas feitas é renderizada na página', () => {
    renderWithRouter(<DoneRecipes />);
    const mealImg = screen.getByTestId('0-horizontal-image');
    expect(mealImg).toBeInTheDocument();
    const mealCategory = screen.getByTestId('0-horizontal-top-text');
    expect(mealCategory).toBeInTheDocument();
    expect(mealCategory.textContent).toBe('Italian - Vegetarian');
    const mealTitle = screen.getByTestId('0-horizontal-name');
    expect(mealTitle).toBeInTheDocument();
    expect(mealTitle.textContent).toBe('Spicy Arrabiata Penne');
    const mealFirstTag = screen.getByTestId('0-Pasta-horizontal-tag');
    expect(mealFirstTag).toBeInTheDocument();
    expect(mealFirstTag.textContent).toBe('Pasta');
    const mealSecondTag = screen.getByTestId('0-Curry-horizontal-tag');
    expect(mealSecondTag).toBeInTheDocument();
    expect(mealSecondTag.textContent).toBe('Curry');
    const mealShareBtn = screen.getByTestId(shareBtn);
    expect(mealShareBtn).toBeInTheDocument();
  });

  it('Testa se o filtro é renderizado na pagina', () => {
    renderWithRouter(<DoneRecipes />);
    const mealBtn = screen.getByTestId(btnMealFilter);
    const mealTitle = screen.getByText(/spicy arrabiata penne/i);
    const drinkTitle = screen.getByText(/aquamarine/i);
    expect(drinkTitle).toBeInTheDocument();
    expect(mealTitle).toBeInTheDocument();
    act(() => {
      userEvent.click(mealBtn);
    });
    expect(mealTitle).toBeInTheDocument();
    expect(drinkTitle).not.toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId(btnDrinkFilter));
    });
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId(btnAllFilter));
    });
    expect(screen.getByText(/spicy arrabiata penne/i)).toBeInTheDocument();
    expect(screen.getByText(/aquamarine/i)).toBeInTheDocument();
  });

  it('Testa se a ao clicar no nome da bebida é alterada a rota para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const drinkTitle = screen.getByTestId('1-horizontal-name');
    expect(drinkTitle).toBeInTheDocument();
    act(() => {
      userEvent.click(drinkTitle);
    });
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Testa botão de compartilhar drink e compartilhar comida', () => {
    renderWithRouter(<DoneRecipes />);
    const writeText = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    });
    const drinkShareBtn = screen.getByTestId(shareDrink);
    expect(drinkShareBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(drinkShareBtn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/drinks/178319');
    expect(
      screen.getByRole('button', {
        name: /link copied!/i,
      }),
    ).toBeInTheDocument();

    const foodShareBtn = screen.getByTestId(shareBtn);
    expect(foodShareBtn).toBeInTheDocument();
    act(() => {
      userEvent.click(foodShareBtn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/meals/52771');
    expect(
      screen.getByRole('button', {
        name: /link copied!/i,
      }),
    ).toBeInTheDocument();
  });

  it('Testa se é alterada a rota para a pagina de detalhes ao clicar no nome da comida', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const foodName = screen.getByTestId('0-horizontal-name');
    expect(foodName).toBeInTheDocument();
    act(() => {
      userEvent.click(foodName);
    });
    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Testa se é alterada a rota para a pagina de detalhes ao clicar na imagem da comida', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const foodImage = screen.getByTestId('0-horizontal-image');
    expect(foodImage).toBeInTheDocument();
    act(() => {
      userEvent.click(foodImage);
    });
    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Testa se a ao clicar na imagem da bebida é alterada a rota para a pagina de detalhes', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const drinkIamage = screen.getByTestId('1-horizontal-image');
    expect(drinkIamage).toBeInTheDocument();
    act(() => {
      userEvent.click(drinkIamage);
    });
    expect(history.location.pathname).toBe('/drinks/178319');
  });
});
