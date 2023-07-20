import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Verifica as funcionalidades do componente Footer', () => {
  it('Verifica se o componente é renderizado na tela corretamente', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
  it('Verifica se o componente possui dois botões', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer.childElementCount).toBe(2);
  });
  it('Verifica se o primeiro botão possui o atributo drinks', () => {
    const { history } = renderWithRouter(<Footer />);
    history.push('/drinks');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });
});
