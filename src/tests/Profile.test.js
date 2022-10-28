import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';

describe('Testes da tela Profile', () => {
  it('Verifica se os itens foram renderizados', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    waitFor(() => {
      const profileEmail = screen.findByTestId('profile-email');
      expect(profileEmail).toBeInTheDocument();
    });
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');

    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });
  test('Testa botao de Logout', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const btnFavoriteRecipe = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnFavoriteRecipe);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });
});
