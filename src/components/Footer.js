import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const [continueButton, setContinueButton] = useState(false);
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

  const findInProgressRecipe = (id, parse) => {
    const mealKeys = Object.keys(parse.meals) || [];
    const drinkKeys = Object.keys(parse.drinks) || [];
    const allKeys = mealKeys.concat(drinkKeys) || [];
    console.log('allkeys some', allKeys.some((k) => k === id));
    if (allKeys.some((k) => k === id)) handleContinueButton(true);
    else handleContinueButton(false);
  };

  useEffect(() => {
    if (pathname.includes('in-progress')) handleContinueButton(true);
    const getLocal = localStorage.getItem('inProgressRecipes');
    const parse = JSON.parse(getLocal) || { meals: {}, drinks: {} };
    if (pathname.startsWith('/meal')) {
      const newId = pathname.slice(INDEX_MEAL_ID);
      findInProgressRecipe(newId, parse);
    }
    if (pathname.includes('/drink')) {
      const newId = pathname.slice(INDEX_DRINK_ID);
      findInProgressRecipe(newId, parse);
    }
  }, [history, pathname, handleContinueButton, findInProgressRecipe]);

  return (
    <footer>
      { (pathname.endsWith('/meals') || pathname.endsWith('/meals/')
      || pathname.endsWith('/drinks') || pathname.endsWith('/drinks/')
      || pathname.endsWith('/profile')) && (
        <div className="footer" data-testid="footer">
          <Link to="/meals">
            <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
          </Link>
          <Link to="/drinks">
            <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
          </Link>
        </div>
      ) }
      { ((pathname.includes('/meals/')
      || pathname.includes('/drinks/'))
      )
        && (
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
