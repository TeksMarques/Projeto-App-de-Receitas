import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { verificaAndamentoDaReceitaESalva,
  verificaAndamentoDaReceita } from '../services/localStorage';

export default function Footer() {
  const [path, setPath] = useState('');
  const [continueButton, setContinueButton] = useState(false);
  const [apenasId, setApenasId] = useState(0);
  const INDEX_MEAL_ID = 7;
  const INDEX_DRINK_ID = 8;

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    setPath(pathname);
    let newId = '';
    if (pathname.includes('/meal')) newId = pathname.slice(INDEX_MEAL_ID);
    else newId = pathname.slice(INDEX_DRINK_ID);
    setApenasId(newId);
    if (verificaAndamentoDaReceita(path, apenasId)) { setContinueButton(true); }
  }, [pathname, path, apenasId]);

  const startRecipe = useCallback(() => {
    verificaAndamentoDaReceitaESalva(path, apenasId);
    setContinueButton(true);
  }, [path, apenasId]);

  return (
    <footer className="footer" data-testid="footer">
      { ((path.includes('/meals/')
      || path.includes('/drinks/'))
      )
        && (
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              data-testid="start-recipe-btn"
              className="fixed-bottom"
              onClick={ startRecipe }
            >
              { continueButton ? 'Continue Recipe' : 'Start Recipe' }
            </Button>
          </div>
        ) }
      { (path === '/meals' || path === '/drinks' || path === '/profile') && (
        <div className="footer">
          <Link to="/meals">
            <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
          </Link>
          <Link to="/drinks">
            <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
          </Link>
        </div>
      ) }
    </footer>
  );
}
