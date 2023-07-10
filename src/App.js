import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Notfound from './pages/Notfound';
import './App.css';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ Notfound } />
      </Switch>
    </main>
  );
}

export default App;
