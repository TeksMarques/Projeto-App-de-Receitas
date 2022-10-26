import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './renderWith';
import App from '../App';

describe('Testes da tela SearchBar', () => {
  const searchTopBtn = 'search-top-btn';
  const searchInput = 'search-input';
  const execSearchButton = 'exec-search-btn';
  const nameSearchRadio = 'name-search-radio';
  const firstLetterSearchRadio = 'first-letter-search-radio';
  test('Testando a Search Bar e botão Ingredients', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });

    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    expect(searchBarElement).toBeInTheDocument();

    const radioIngredientElement = screen.getByTestId('ingredient-search-radio');
    expect(radioIngredientElement).toBeInTheDocument();

    const radioNameElement = screen.getByTestId(nameSearchRadio);
    expect(radioNameElement).toBeInTheDocument();

    const radioFirstLetterElement = screen.getByTestId(firstLetterSearchRadio);
    expect(radioFirstLetterElement).toBeInTheDocument();

    const getResultButtonElement = screen.getByTestId(execSearchButton);
    expect(getResultButtonElement).toBeInTheDocument();

    userEvent.type(searchBarElement, 'chicken');
    userEvent.click(radioIngredientElement);
    userEvent.click(getResultButtonElement);
  });
  test('Testa pesquisa por nome', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    const radioNameElement = screen.getByTestId(nameSearchRadio);
    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'potato');
    userEvent.click(radioNameElement);
    userEvent.click(getResultButtonElement);
  });
  test('Testando pesquisa por Fisrt letter', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const searchButtonElement = screen.getByTestId(searchTopBtn);
    userEvent.click(searchButtonElement);

    const searchBarElement = screen.getByTestId(searchInput);
    const radioFirstLetterElement = screen.getByTestId(firstLetterSearchRadio);
    const getResultButtonElement = screen.getByTestId(execSearchButton);

    userEvent.type(searchBarElement, 'c');
    userEvent.click(radioFirstLetterElement);
    userEvent.click(getResultButtonElement);
    await screen.findByTestId('0-recipe-card');

    // userEvent.type(searchBarElement, 'ca');
    // userEvent.click(radioFirstLetterElement);
    // userEvent.click(getResultButtonElement);
    // global.alert = jest.fn();
    // expect(global.alert).toHaveBeenCalledTimes(0);
  });
});
