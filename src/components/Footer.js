import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import teste from 'prop-types';
import Button from 'react-bootstrap/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer(props) {
  const [continueButton, setContinueButton] = useState(false);
  const { meals, drinks, profile } = props;
  const INDEX_MEAL_ID = 7;
  const INDEX_DRINK_ID = 8;

  const history = useHistory();
  const { location: { pathname } } = history;

  const startRecipe = useCallback(() => {
    setContinueButton(true);
    history.push(`${pathname}/in-progress`);
  }, [history, pathname]);

  const handleContinueButton = useCallback((value) => {
    setContinueButton(value);
  }, []);

  const findInProgressRecipe = useCallback((id, getLocal) => {
    // const mealKeys = Object.keys(parse.meals) || [];
    // const drinkKeys = Object.keys(parse.drinks) || [];
    // const allKeys = mealKeys.concat(drinkKeys) || [];
    if (getLocal !== undefined) {
      const keys = Object.keys(getLocal);
      if (keys.some((re) => re === id)) handleContinueButton(true);
      else handleContinueButton(false);
    };
  }, [handleContinueButton]);

  useEffect(() => {
    if (pathname.includes('in-progress')) handleContinueButton(true);
    const getLocal = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { meals: {}, drinks: {} };
    if (pathname.startsWith('/meal')) {
      const newId = pathname.slice(INDEX_MEAL_ID);
      findInProgressRecipe(newId, getLocal.meals);
    }
    if (pathname.includes('/drink')) {
      const newId = pathname.slice(INDEX_DRINK_ID);
      findInProgressRecipe(newId, getLocal.drinks);
    }
  }, [history, pathname, handleContinueButton, findInProgressRecipe]);

  return (
    <footer data-testid="footer">
      { (meals || drinks || profile)
        ? (
          <div className="footer" data-testid="footer">
            <Link to="/meals">
              <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
            </Link>
            <Link to="/drinks">
              <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
            </Link>
          </div>
        )
        : (
          <div className="d-grid gap-2">
            <Button
              variant="success"
              size="lg"
              data-testid="start-recipe-btn"
              className="fixed-bottom"
              onClick={ startRecipe }
            >
              { continueButton ? 'Continue Recipe' : 'Start Recipe' }
            </Button>
          </div>
        ) }
    </footer>
  );
}

Footer.propTypes = {
  meals: teste.bool,
  drinks: teste.bool,
  profile: teste.bool,
}.isRequired;
