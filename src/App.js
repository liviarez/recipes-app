import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Notfound from './pages/Notfound';
import Meals from './components/Meals';
import Profile from './components/Profile';
import Drinks from './components/Drinks';
import './App.css';
import RecipeDetails from './pages/RecipeDetails';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route
          exact
          path="/meals/:idReceita" // a url que esta no readme da erro "/meals/:id-da-receita" pode dar erro na hora dos testes
          render={ (propsRouter) => (
            <RecipeDetails
              { ...propsRouter }
              type="meals"
            />
          ) }
        />
        <Route
          exact
          path="/drinks/:idReceita" // a url que esta no readme da erro "/meals/:id-da-receita" pode dar erro na hora dos testes
          render={ (propsRouter) => (
            <RecipeDetails
              { ...propsRouter }
              type="drinks"
            />
          ) }
        />
        <Route exact path="/receitas" component={ Meals } />
        <Route path="*" component={ Notfound } />
      </Switch>
    </main>
  );
}

export default App;
