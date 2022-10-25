import React from 'react';
import { useLocation } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import RecipesProvider from '../context/RecipesProvider';
import Meals from '../pages/Meals';

describe('Testes da tela Footer - Menu inferior', () => {
  it('Procura elementos obrigatórios', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    if (history.location.pathname === '/meals') {
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
      expect(screen.getByTestId('meals-bottom-btn')).toBeInTheDocument();
    }
  });
  it('Verifica se é possível ir para a rota /drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    if (history.location.pathname === '/meals') {
      const drinksBtn = screen.getByTestId('drinks-bottom-btn');
      userEvent.click(drinksBtn);
      const location = useLocation();
      expect(location.pathname).toBe('/drinks');
    }
  });
  it('Verifica se é possível ir para a rota /drinks', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    if (history.location.pathname === '/meals') {
      const mealsBtn = screen.getByTestId('meals-bottom-btn');
      userEvent.click(mealsBtn);
      const location = useLocation();
      expect(location.pathname).toBe('/meals');
    }
  });
});
