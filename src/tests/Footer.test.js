import React from 'react';
import { useLocation } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import meals from '../../cypress/mocks/meals';

describe('Testes da tela Footer - Menu inferior', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => meals }));
  });

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
        <Drinks />
      </RecipesProvider>,
    );
    if (history.location.pathname === '/meals') {
      const drinksBtn = screen.getByTestId('drinks-bottom-btn');
      userEvent.click(drinksBtn);
      const location = useLocation();
      expect(location.pathname).toBe('/drinks');
      expect(fetch).toHaveBeenCalled();
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
      expect(fetch).toHaveBeenCalled();
    }
  });

  it('Inicia uma nova receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      const firstCard = screen.getByTestId('0-recipe-card');
      expect(firstCard).toBeInTheDocument();
      userEvent.click(firstCard);
    });
    await waitFor(() => {
      const startBtn = screen.getByTestId('start-recipe-btn');
      expect(startBtn).toBeInTheDocument();
      userEvent.click(startBtn);
    });
    await waitFor(() => {
      const finishBtn = screen.getByTestId('finish-recipe-btn');
      expect(finishBtn).toBeInTheDocument();
    });
  });
});
