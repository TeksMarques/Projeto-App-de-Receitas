import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function Search() {
  const { searchString, useSearchString,
    useSearchRadioButton, searchBy } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const estouEm = pathname;
  return (
    <Form>
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
      <Button
        variant="primary"
        size="sm"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => searchBy(estouEm) }
      >
        Pesquisar
      </Button>
      <div className="mb-2">
        <Form.Check
          inline
          type="radio"
          id="ingredients"
          name="searchFor"
          value="byIngredients"
          data-testid="ingredient-search-radio"
          onClick={ useSearchRadioButton }
          label="Ingrediente"
        />
        <Form.Check
          inline
          type="radio"
          id="name"
          name="searchFor"
          value="byName"
          data-testid="name-search-radio"
          onClick={ useSearchRadioButton }
          label="Nome"
        />
        <Form.Check
          inline
          type="radio"
          id="firstletter"
          name="searchFor"
          value="byFirstLetter"
          data-testid="first-letter-search-radio"
          onClick={ useSearchRadioButton }
          label="Inicial"
        />
      </div>
      { /* <fieldset>
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
            </fieldset> */ }
    </Form>
  );
}
