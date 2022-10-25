import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import RecipesProvider from '../context/RecipesProvider';
import Meals from '../pages/Meals';

describe('Testes da tela SearchBar', () => {
  test('Testa ao pesquisar ingrediente', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    if (history.location.pathname === '/meals') {
      const searchLink = screen.getByTestId('search-top-btn');
      userEvent.click(searchLink);
      const searchInput = screen.getByTestId('search-input');
      userEvent.type(searchInput, 'potato');
      userEvent.click(screen.getByTestId('exec-search-btn'));
      expect(history.location.pathname).toBe('/meals/52782');
    }
  });
  test('Testa ao pesquisar por nome', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    if (history.location.pathname === '/meals') {
      const searchLink = screen.getByTestId('search-top-btn');
      userEvent.click(searchLink);
      const searchInput = screen.getByTestId('search-input');
      userEvent.type(searchInput, 'potato');
      userEvent.click(screen.getByText(/ingrediente/i));
      userEvent.click(screen.getByText(/first letter/i));
      userEvent.click(screen.getByText(/nome/i));
      userEvent.click(screen.getByTestId('exec-search-btn'));
      await waitFor(() => {
        expect(fetch).toBeCalled();
        expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
        expect(screen.getByTestId('0-card-img')).toBeInTheDocument();
        expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
      });
    }
  });
});
