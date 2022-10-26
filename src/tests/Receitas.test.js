import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';

const mockData = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const mockDataDrink = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];

describe('Testes da tela Meals', () => {
  test('Testa se o Header está na rota /meals', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    screen.findByTestId('profile-top-btn');
  });
  test('Testa a barra de categorias no /meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    expect(fetch).toHaveBeenCalled();
    waitFor(() => {
      const categories = screen.findAllByRole('button');
      expect(categories.length).toBe(5);
    });
  });
  test('Testa se o Header está na rota /drinks', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/drinks');
    });
    screen.findByTestId('profile-top-btn');
  });
  test('Testa a barra de categorias no /drinks', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockDataDrink }));
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/drinks');
    });
    expect(fetch).toHaveBeenCalled();
    // waitFor(() => {
    //   const categories = screen.findAllByRole('button');
    //   expect(categories.length).toBe(5);
    // });
  });
});
