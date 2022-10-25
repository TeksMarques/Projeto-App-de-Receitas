import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import { renderWithRouter } from './renderWith';
import RecipesProvider from '../context/RecipesProvider';

test('Testa botao de perfil', () => {
  const { history } = renderWithRouter(
    <RecipesProvider>
      <Meals />
    </RecipesProvider>,
  );
  if (history.location.pathname === '/meals') {
    const profileLink = screen.getByTestId('profile-top-btn');
    expect(profileLink).toBeInTheDocument();
    userEvent.click(profileLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  }
});
test('Testa botão de pesquisa', () => {
  const { history } = renderWithRouter(
    <RecipesProvider>
      <Meals />
    </RecipesProvider>,
  );
  if (history.location.pathname === '/meals') {
    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByRole('img', {
      name: /serach icon/i,
    });
    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    userEvent.click(searchLink);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'receita');
    userEvent.click(searchInput);
    expect(searchInput).not.toBeInTheDocument();
  }
});
