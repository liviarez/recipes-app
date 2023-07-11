import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Notfound from './components/Notfound';
import Meals from './components/Meals';
import './App.css';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
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
