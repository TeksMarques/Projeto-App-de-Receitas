import React from 'react';
import { screen, waitFor } from '@testing-library/react';
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
  test('Testa pesquisa por nome', async () => {
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
    expect(history.location.pathname).toBe('/meals');
    userEvent.click(getResultButtonElement);
    waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52782');
    });
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
    waitFor(() => {
      const primeiroCard = screen.findByTestId('0-recipe-card');
      expect(primeiroCard).toBeInTheDocument();
      for (let index = 0; index < 13; index += 1) {
        const element = screen.findByTestId(`${index}-recipe-card`);
        expect(element).toBeInTheDocument();
      }
    });
  });
});
