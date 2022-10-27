import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import verificaIdNoDoneRecipes from '../services/localStorage';

export default function Footer() {
  const [path, setPath] = useState('');
  const [mostra, setMostra] = useState(true);
  const INDEX_MEAL_ID = 7;
  const INDEX_DRINK_ID = 8;

  const { location: { pathname } } = useHistory();

  const agoraVerifique = useCallback(async (sohId) => {
    const receitaDone = await verificaIdNoDoneRecipes(sohId);
    if (receitaDone !== undefined) {
      if (+(receitaDone.id) === +(sohId)) setMostra(false);
      else setMostra(true);
    }
  }, []);

  useEffect(() => {
    setPath(pathname);
    let newId = '';
    if (pathname.includes('/meal')) newId = pathname.slice(INDEX_MEAL_ID);
    else newId = pathname.slice(INDEX_DRINK_ID);
    agoraVerifique(newId);
  }, [pathname, path, agoraVerifique]);

  return (
    <footer data-testid="footer">
      { ((path.includes('/meals/')
      || path.includes('/drinks/'))
      && mostra
      )
        && (
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              data-testid="start-recipe-btn"
              className="fixed-bottom"
            >
              Start Recipe
            </Button>
          </div>
        ) }
      { ((path.includes('/meals/')
      || path.includes('/drinks/'))
      && !mostra
      )
        && (
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="lg"
              className="fixed-bottom"
            >
              Continue Recipe
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
