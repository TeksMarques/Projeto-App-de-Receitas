import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import verificaIdNoDoneRecipes from '../services/localStorage';

export default function Footer() {
  const [path, setPath] = useState('');
  const [id, setId] = useState('');
  const [mostra, setMostra] = useState(true);
  const INDEX_ID = 7;

  const { location: { pathname } } = useHistory();

  const agoraVerifique = useCallback(async () => {
    const receitaDone = await verificaIdNoDoneRecipes(id);
    if (+(receitaDone.id) === +(id)) setMostra(false);
    else setMostra(true);
  }, [id]);

  useEffect(() => {
    setPath(pathname);
    setId(path.slice(INDEX_ID));
    agoraVerifique();
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
