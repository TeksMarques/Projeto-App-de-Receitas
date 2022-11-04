import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';
// import meals from '../../cypress/mocks/meals';
// import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa os detalhes de uma receita', () => {
  // beforeEach(() => {
  //   global.fetch = jest.fn(oneDrink);
  // });

  test('Testa os requisitos do RecipeDetails (drink)', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => ({ json: () => oneDrink }));
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/drinks/178319');
    });
    expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      expect(screen.getByText('Cocktail')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      // sexta, 08h21: RecipeDetails.js    |   63.63 |    64.51 |   41.66 |   68.29 | 45-46, 55-56, 60-67, 150
      // userEvent.click(shareBtn);
    });
  });
});
