import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Provider from '../Context/Provider';

export function renderWithRouter(component) {
  return render(
    <Provider>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>,
  );
}
