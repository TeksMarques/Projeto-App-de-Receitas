import React, { useEffect, useState } from 'react';
import teste from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Recomendacoes from '../components/Recomendacoes';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { saveMealAsFavorite, saveDrinkAsFavorite } from '../services/localStorage';

const copy = require('clipboard-copy');

function RecipesDetails(props) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);
  const { recomendados, ehMeal, recipe, recipe: { idMeal, idDrink, strCategory,
    strInstructions, strMeal, strMealThumb, strYoutube, strDrink,
    strDrinkThumb, strAlcoholic } } = props;

  const history = useHistory();

  const getIngredients = (recipeItem, str) => {
    const result = Object.entries(recipeItem)
      .map(([key, value]) => {
        if (key.includes(str)) {
          return value;
        }
        return '';
      })
      .filter((arr) => arr !== '' && arr !== null && arr !== ' ');
    return result;
  };

  useEffect(() => {
    const pageTitle = recipe.strMeal || recipe.strDrink;
    document.title = `Receita: ${pageTitle}`;
    const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (getLocal.some((rf) => rf.id === idMeal)
    || getLocal.some((rf) => rf.id === idDrink)) {
      setChangeBtn(true);
    } else { setChangeBtn(false); }
    const ing = getIngredients(recipe, 'strIngredient');
    const mea = getIngredients(recipe, 'strMeasure');
    setIngredients(ing);
    setMeasures(mea);
  }, [recipe, idDrink, idMeal]);

  const shareRecipe = () => {
    copy(window.location.href);
    setShowMessage(true);
  };

  const favoriteRecipe = () => {
    const { location: { pathname } } = history;
    if (pathname.includes('meal')) saveMealAsFavorite(recipe);
    else saveDrinkAsFavorite(recipe);
    const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (getLocal.some((rf) => rf.id === idMeal)
    || getLocal.some((rf) => rf.id === idDrink)) {
      setChangeBtn(true);
    } else { setChangeBtn(false); }
  };

  return (
    <Card className="maximo">
      <Card.Img
        variant="top"
        data-testid="recipe-photo"
        src={ ehMeal ? strMealThumb : strDrinkThumb }
      />

      <Card.Body>
        <Card.Title data-testid="recipe-title" className="container-title">
          { ehMeal ? (<span className="type-tittle">{strMeal}</span>)
            : (<span className="type-tittle">{strDrink}</span>) }
          <button
            type="button"
            // data-testid="share-btn"
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
        <Card.Text data-testid="recipe-category" align="center">
          <Badge bg="success">
            { strCategory }
          </Badge>
          <Badge bg="success">
            { strAlcoholic }
          </Badge>

        </Card.Text>
        {showMessage && (
          <Card.Text>
            <Alert>
              Link copied!
            </Alert>
          </Card.Text>
        ) }

        <Card.Text data-testid="instructions">
          { strInstructions }
        </Card.Text>
        { ehMeal && (
          <Card.Text data-testid="video">
            <iframe
              title={ strMeal }
              width="330"
              src={ strYoutube.replace('watch?v=', 'embed/') }
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
            />
          </Card.Text>) }
      </Card.Body>
      <ListGroup className="list-group-flush" as="ul">
        { ingredients.map((ingredient, index) => (
          <ListGroup.Item
            as="li"
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
            className="d-flex justify-content-between align-items-center"
            style={ { width: '360px' } }
          >
            {/* <div className="ms-2 me-auto"> */}
            { ingredient }
            {/* </div> */}
            <Badge bg="primary" pill>
              { measures[index] }
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Recomendacoes data={ recomendados } />
      <Footer />
    </Card>
  );
}

RecipesDetails.propTypes = {
  strMeal: teste.string,
}.isRequired;

export default RecipesDetails;
