import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../Context/Provider';

export function renderWithRouter(component) {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Provider>
        <Router history={ history }>
          {component}
        </Router>
        ,
      </Provider>,
    ),
    history,
  });
}
