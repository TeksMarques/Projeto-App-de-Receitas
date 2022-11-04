import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';
// import meals from '../../cypress/mocks/meals';

describe('Testes da tela DoneRecipes', () => {
  beforeEach(() => {
    const card = [{
      alcoholicOrNot: '',
      category: 'Side',
      doneDate: '2022-11-03T20:22:57.984Z',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      tags: ['Soup'],
      type: 'meal',
    }];

    localStorage.setItem('doneRecipes', JSON.stringify(card));

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(card));
  });
  const path = '/done-recipes';
  it('Procura elementos obrigatórios', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(path);
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
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(path);
    });
    await waitFor(() => {
      const btn = screen.getByTestId('0-horizontal-share-btn');
      expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
      expect(screen.getByTestId('0-Soup-horizontal-tag')).toBeInTheDocument();
      expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
    });
  });
  // it('clica no botão', () => {
  //   const { history } = renderWithRouter(
  //     <App />,
  //   );
  //   act(() => {
  //     history.push(path);
  //   });

  //   const btn = screen.getByTestId('0-horizontal-share-btn');
  //   userEvent.click(btn);

  //   expect(screen.getByText('Link copied!')).toBeInTheDocument();
  // });
});
