import React from 'react';
import './App.css';
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
  );
}

export default App;
