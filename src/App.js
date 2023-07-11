import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Notfound from './components/Notfound';
import Meals from './components/Meals';
import './App.css';
<<<<<<< HEAD

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/receitas" component={ Meals } />
        <Route path="*" component={ Notfound } />
      </Switch>
    </main>
=======
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <div className="meals">
      <span className="logo">GRUPO 2 UHUL 🫶 </span>
      <span className="logo">Não abandonarás os coleguinhas no meio do percurso!</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <RecipeInProgress />
    </div>
>>>>>>> main-group-2-req37-yago
  );
}

export default App;
