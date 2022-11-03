import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import teste from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Alert } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchByIdDrink, fetchByIdMeal } from '../services/fetchApi';
import { mealInProgress, drinkInProgress, saveMealAsFavorite, saveDrinkAsFavorite,
  saveMealAsDone, saveDrinkAsDone } from '../services/localStorage';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

export default function RecipeInProgress(props) {
  const [data, setData] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredientesUsados, setIngredientesUsados] = useState([]);
  const [ehMeal, setEhMeal] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);
  const [finishBtnDisabled, setFinishBtnDisabled] = useState(true);
  const { mealsData, drinksData } = useContext(RecipesContext);
  const { match: { path, params: { id } } } = props;
  const history = useHistory();
  const SELECTED = 'used-ingredient';

  const getIngredients = (recipeItem, str) => {
    const result = recipeItem
      .map(([key, value]) => {
        if (key.includes(str)) return value;
        return '';
      }).filter((arr) => arr !== '' && arr !== null && arr !== ' ');
    return result;
  };

  const shareRecipe = () => {
    copy(window.location.href.replace('/in-progress', ''));
    setShowMessage(true);
  };

  const favoriteRecipe = () => {
    if (path.includes('meal')) {
      saveMealAsFavorite(data);
    } else saveDrinkAsFavorite(data);
    setChangeBtn(!changeBtn);
  };

  const finishRecipe = useCallback(() => {
    const dateDoneRecipe = new Date();
    if (path.includes('meal')) saveMealAsDone(data, dateDoneRecipe);
    else saveDrinkAsDone(data, dateDoneRecipe);
    history.push('../../done-recipes');
  }, [history, data, path]);

  useEffect(() => {
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    const fazOFetch = async () => {
      if (path.includes('meal')) {
        setEhMeal(true);
        const retorno = await fetchByIdMeal(id);
        const meusIngredientes = Object.entries(retorno[0]);
        setData(retorno[0]);
        const ing = getIngredients(meusIngredientes, 'strIngredient');
        const mea = getIngredients(meusIngredientes, 'strMeasure');
        setIngredients(ing);
        setMeasures(mea);
        const novaLista = getLocal.meals[id] || [];
        setIngredientesUsados(novaLista);
        mealInProgress(id, getLocal, novaLista);
      } else {
        setEhMeal(false);
        const retorno = await fetchByIdDrink(id);
        setData(retorno[0]);
        const meusIngredientes = Object.entries(retorno[0]);
        const ing = getIngredients(meusIngredientes, 'strIngredient');
        const mea = getIngredients(meusIngredientes, 'strMeasure');
        setIngredients(ing);
        setMeasures(mea);
        const novaLista = getLocal.drinks[id] || [];
        setIngredientesUsados(novaLista);
        drinkInProgress(id, getLocal, novaLista);
      }
    };
    setData(fazOFetch());
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favRecipes.some((rf) => rf.id === id)) setChangeBtn(true);
  }, [mealsData, drinksData, path, id]);

  const markIngredient = (event) => {
    const { target: { value } } = event;
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (path.includes('meal')) {
      const ingUtilizados = getLocal.meals[id] || [];
      if (ingUtilizados.some((ing) => ing === value)) {
        const filtro = ingUtilizados.filter((ing) => ing !== value);
        event.target.parentElement.className = '';
        setIngredientesUsados(filtro);
        mealInProgress(id, getLocal, filtro);
      } else {
        ingUtilizados.push(value);
        event.target.parentElement.className = SELECTED;
        setIngredientesUsados(ingUtilizados);
        mealInProgress(id, getLocal, ingUtilizados);
      }
    } else {
      const ingUtilizados = getLocal.drinks[id] || [];
      if (ingUtilizados.some((ing) => ing === value)) {
        const filtro = ingUtilizados.filter((ing) => ing !== value);
        setIngredientesUsados(filtro);
        event.target.parentElement.className = '';
        drinkInProgress(id, getLocal, filtro);
      } else {
        ingUtilizados.push(value);
        event.target.parentElement.className = SELECTED;
        setIngredientesUsados(ingUtilizados);
        drinkInProgress(id, getLocal, ingUtilizados);
      }
    }
  };

  useEffect(() => {
    if ((ingredientesUsados.length) === (ingredients.length)) setFinishBtnDisabled(false);
    else { setFinishBtnDisabled(true); }
  }, [ingredientesUsados, ingredients.length]);

  return (
    <Card style={ { width: '360px' } }>
      <Card.Img
        variant="top"
        data-testid="recipe-photo"
        src={ ehMeal ? data.strMealThumb : data.strDrinkThumb }
      />
      <Card.Body>
        <Card.Title data-testid="recipe-title" className="container-title">
          { ehMeal ? data.strMeal
            : data.strDrink }
          <button
            type="button"
            className="search-top"
            onClick={ shareRecipe }
          >
            <img
              src={ shareIcon }
              alt="shareIcon"
              data-testid="share-btn"
            />
          </button>

          <button
            type="button"
            className="search-top"
            onClick={ favoriteRecipe }
          >
            { changeBtn ? (
              <img
                src={ blackHeartIcon }
                alt="Receita favoritada"
                data-testid="favorite-btn"
              />)
              : (
                <img
                  src={ whiteHeartIcon }
                  alt="Favorite esta receita!"
                  data-testid="favorite-btn"
                />) }
          </button>
        </Card.Title>

        <Card.Text data-testid="recipe-category">
          { data.strCategory }
          { ' ' }
          { data.strAlcoholic }
        </Card.Text>
        { showMessage && (
          <Card.Text>
            <Alert>
              Link copied!
            </Alert>
          </Card.Text>
        ) }

        <Card.Text data-testid="instructions">
          { data.strInstructions }
        </Card.Text>
      </Card.Body>

      <ListGroup className="list-group-flush" as="ul">
        { ingredients?.map((ingredient, index) => (
          <ListGroup.Item
            as="li"
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
            className="d-flex align-items-center"
            style={ { width: '360px' } }
          >
            <form>
              <label
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                className={ (ingredientesUsados.some((iu) => iu === ingredient))
                  ? SELECTED : ('') }
              >
                <input
                  id={ ingredient }
                  type="checkbox"
                  value={ ingredient }
                  defaultChecked={ ingredientesUsados.some((iu) => iu === ingredient) }
                  onChange={ markIngredient }
                />
                { ingredient }
                <Badge bg="success" pill>
                  { measures[index] }
                </Badge>
              </label>
            </form>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finishBtnDisabled }
        onClick={ finishRecipe }
      >
        Finish Recipe
      </button>
    </Card>
  );
}

RecipeInProgress.propTypes = {
  match: teste.shape({
    path: teste.shape({
      id: teste.string,
    }),
  }),
}.isRequired;
