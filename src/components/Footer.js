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
    history.push(`${pathname}/in-progress`);
  }, [history, pathname]);

  const findInProgressRecipe = (id, parse) => {
    const mealKeys = Object.keys(parse.meals) || [];
    const drinkKeys = Object.keys(parse.drinks) || [];
    const allKeys = mealKeys.concat(drinkKeys) || [];
    if (allKeys.some((k) => k === id)) startRecipe();
    else console.log('Não encontrou');
  };

  useEffect(() => {
    if (pathname.includes('in-progress')) setContinueButton(true);
    const getLocal = localStorage.getItem('inProgressRecipes');
    const parse = JSON.parse(getLocal) || { meals: {}, drinks: {} };
    console.log('parse no useEffect', parse);
    if (pathname.startsWith('/meal')) {
      const newId = pathname.slice(INDEX_MEAL_ID);
      findInProgressRecipe(newId, parse);
    }
    if (pathname.includes('/drink')) {
      const newId = pathname.slice(INDEX_DRINK_ID);
      findInProgressRecipe(newId, parse);
    } else {
      console.log('FOOTER: esta receita não está In Progress');
      setContinueButton(false);
    }
  }, [history, pathname]);

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
