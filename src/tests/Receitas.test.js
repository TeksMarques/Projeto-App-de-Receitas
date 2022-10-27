import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';

const mockCategoriesMeal = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const mockDataDrink = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];

describe('Testes da tela de Receitas', () => {
  test('Testa os requisitos da tela na rota /meals', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockCategoriesMeal }));
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    screen.findByTestId('profile-top-btn');
    expect(fetch).toHaveBeenCalled();
    waitFor(() => {
      const categories = screen.findAllByRole('button');
      expect(categories.length).toBe(5);
      userEvent.click(primeiroCard);
    });
  });
  // test('Testa os requisitos da tela na rota /meals', () => {
  //   jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockCategoriesMeal }));
  //   const { history } = renderWithRouter(
  //     <App />,
  //   );
  //   act(() => {
  //     history.push('/meals');
  //   });
  //   expect(screen.findByTestId('0-recipe-card')).toBeInTheDocument();
  //   expect(screen.findByTestId('0-card-img')).toBeInTheDocument();
  // });

  test('Testa os requisitos da tela na rota /drinks', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockDataDrink }));
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/drinks');
    });
    screen.findByTestId('profile-top-btn');
    expect(fetch).toHaveBeenCalled();
    waitFor(() => {
      const categories = screen.findAllByRole('button');
      expect(categories.length).toBe(5);
    });
  });
});
