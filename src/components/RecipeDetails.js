import React, { useEffect, useState } from 'react';
import teste from 'prop-types';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Recomendacoes from './Recomendacoes';
import Footer from './Footer';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipesDetails(props) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const { recomendados, ehMeal, recipe, recipe: { strCategory, strInstructions,
    strMeal, strMealThumb, strYoutube, strDrink, strDrinkThumb, strAlcoholic } } = props;

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
    const ing = getIngredients(recipe, 'strIngredient');
    const mea = getIngredients(recipe, 'strMeasure');
    setIngredients(ing);
    setMeasures(mea);
  }, [recipe]);

  const shareRecipe = () => {
    copy(window.location.href);
    setShowMessage(true);
  };

  return (
    <Card style={ { width: '360px' } }>
      <Card.Img
        variant="top"
        data-testid="recipe-photo"
        src={ ehMeal === 'true' ? strMealThumb : strDrinkThumb }
      />

      <Card.Body>
        <Card.Title data-testid="recipe-title">
          { ehMeal === 'true' ? strMeal : strDrink }
        </Card.Title>
        <Card.Text data-testid="recipe-category">
          { strCategory }
          { ' ' }
          { strAlcoholic }
          { ' ' }
          <button
            type="button"
            data-testid="share-btn"
            className="search-top"
            onClick={ shareRecipe }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>

          <button
            type="button"
            data-testid="favorite-btn"
            className="search-top"
          >
            <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
          </button>

        </Card.Text>
        {showMessage && <Card.Text>Link copied!</Card.Text>}

        <Card.Text data-testid="instructions">
          { strInstructions }
        </Card.Text>
        { ehMeal === 'true' && (
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
            style={ { width: '340px' } }
          >
            <div className="ms-2 me-auto">
              { ingredient }
            </div>
            <Badge bg="primary" pill>
              { measures[index] }
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Recomendacoes data={ recomendados } ehMeal={ ehMeal } />
      <Footer />
    </Card>
  );
}

RecipesDetails.propTypes = {
  strMeal: teste.string,
}.isRequired;

export default RecipesDetails;
