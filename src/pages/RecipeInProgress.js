import React, { useContext, useEffect, useState } from 'react';
import teste from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Alert } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { fetchByIdDrink, fetchByIdMeal } from '../services/fetchApi';
import { mealInProgress, drinkInProgress } from '../services/localStorage';
import RecipesContext from '../context/RecipesContext';

const copy = require('clipboard-copy');

export default function RecipeInProgress(props) {
  const [data, setData] = useState({});
  const { mealsData, drinksData } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredientesUsados, setIngredientesUsados] = useState([]);
  const [ehMeal, setEhMeal] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);
  const { match: { path, params: { id } } } = props;

  const getIngredients = (recipeItem, str) => {
    const result = recipeItem
      .map(([key, value]) => {
        if (key.includes(str)) return value;
        return '';
      }).filter((arr) => arr !== '' && arr !== null && arr !== ' ');
    return result;
  };

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
        event.target.parentElement.className = 'used-ingredient';
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
        event.target.parentElement.className = 'used-ingredient';
        setIngredientesUsados(ingUtilizados);
        drinkInProgress(id, getLocal, ingUtilizados);
      }
    }
  };

  useEffect(() => {
    if ((ingredientesUsados.length) === (ingredients.length)) console.log('same size');
    else { console.log('Continue add'); }
  }, [ingredientesUsados]);

  const shareRecipe = () => {
    copy(window.location.href);
    setShowMessage(true);
  };

  // const favoriteRecipe = () => {
  //   if (path.includes('meal')) saveMealAsFavorite(data);
  //   else saveDrinkAsFavorite(data);
  //   const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  //   if (getLocal.some((rf) => rf.id === receitaAtiva.idMeal)
  //   || getLocal.some((rf) => rf.id === receitaAtiva.idDrink)) {
  //     setChangeBtn(true);
  //   } else { setChangeBtn(false); }
  // };

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
            // onClick={ shareRecipe }
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
            // onClick={ favoriteRecipe }
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
                htmlFor={ `${index}-ingredient-name-and-measure` }
                className={ (ingredientesUsados.some((iu) => iu === ingredient))
                  ? ('used-ingredient') : ('') }
              >
                <input
                  id={ `${index}-ingredient-name-and-measure` }
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
    </Card>
  );
}

RecipeInProgress.propType = {
  match: teste.shape({
    path: teste.shape({
      id: teste.string,
    }),
  }),
}.isRequired;
