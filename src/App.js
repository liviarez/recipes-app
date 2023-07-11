import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Notfound from './pages/Notfound';
import './App.css';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          path="/meals/:idReceita" // a url que esta no readme da erro "/meals/:id-da-receita" pode dar erro na hora dos testes
          render={ (propsRouter) => (
            <RecipeDetails
              { ...propsRouter }
              type="meals"
            />
          ) }
        />
        <Route
          path="/drinks/:idReceita" // a url que esta no readme da erro "/meals/:id-da-receita" pode dar erro na hora dos testes
          render={ (propsRouter) => (
            <RecipeDetails
              { ...propsRouter }
              type="drinks"
            />
          ) }
        />
        <Route path="*" component={ Notfound } />
      </Switch>
    </main>
  );
}

export default App;
