import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';

describe('Testes da tela FavoriteRecipes', () => {
  it('Procura elementos obrigatórios', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/favorite-recipes');
    });

    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });
    const btnMeal = screen.getByRole('button', {
      name: /meal/i,
    });
    const btnDrink = screen.getByRole('button', {
      name: /drink/i,
    });
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
    expect(btnMeal).toBeInTheDocument();

    userEvent.click(btnAll);
    userEvent.click(btnDrink);
    userEvent.click(btnMeal);
  });
  it('renderiza card', async () => {
    const card = [{
      favoriteRecipes: {
        alcoholicOrNot: '',
        category: 'Side',
        id: '52977',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        name: 'Corba',
        nationality: 'Turkish',
        type: 'meal',
      },
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(card));

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(card));

    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/favorite-recipes');
    });
    await waitFor(() => {
      expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    });
  });
});
