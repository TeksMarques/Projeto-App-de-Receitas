import React from 'react';
import { useLocation } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './renderWith';

describe('Testes da tela Footer - Menu inferior', () => {
  it('Procura elementos obrigatórios', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
  });
  it('Verifica se é possível ir para a rota /drinks', () => {
    renderWithRouter(<Footer />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    const location = useLocation();
    expect(location.pathname).toBe('/drinks');
  });
  it('Verifica se é possível ir para a rota /drinks', () => {
    renderWithRouter(<Footer />);
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);
    const location = useLocation();
    expect(location.pathname).toBe('/meals');
  });
});
