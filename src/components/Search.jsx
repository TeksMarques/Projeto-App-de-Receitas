import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function Search() {
  const { searchString, useSearchString,
    useSearchRadioButton, searchBy } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const estouEm = pathname;
  return (
    <form>
      <label htmlFor="search-input">
        <input
          id="search-input"
          name="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Pesquise por receitas"
          onChange={ useSearchString }
          value={ searchString }
        />
      </label>
      <fieldset>
        <label htmlFor="ingredients">
          <input
            type="radio"
            id="ingredients"
            name="searchFor"
            value="byIngredients"
            data-testid="ingredient-search-radio"
            onClick={ useSearchRadioButton }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="searchFor"
            value="byName"
            data-testid="name-search-radio"
            onClick={ useSearchRadioButton }
          />
          Nome
        </label>
        <label htmlFor="firstletter">
          <input
            type="radio"
            id="firstletter"
            name="searchFor"
            value="byFirstLetter"
            data-testid="first-letter-search-radio"
            onClick={ useSearchRadioButton }
          />
          First letter
        </label>
      </fieldset>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => searchBy(estouEm) }
      >
        Pesquisar
      </button>
    </form>
  );
}
