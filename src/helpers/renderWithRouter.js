import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export function renderWithRouter(component) {
  return render(<MemoryRouter>{component}</MemoryRouter>);
}
