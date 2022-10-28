import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { verificaAndamentoDaReceita } from '../services/localStorage';

export default function Footer() {
  const [path, setPath] = useState('');
  const [continueButton, setcontinueButton] = useState(true);
  const [apenasId, setApenasId] = useState(0);
  const [mealOrDrink, setMealOrDrink] = useState('');
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
    // startRecipe(newId);
    // verifyInProgressToDone(newId);
  }, [pathname, path, apenasId]);

  const startRecipe = useCallback(() => {
    verificaAndamentoDaReceita(path, apenasId);
    // 3. Salva no localstorage na chave correspondente

    // const receitaInProgress = verificaIdNoInProgressRecipes(apenasId);
    // if (receitaInProgress !== undefined) {
    //   setcontinueButton(false);
    //   history.push(`${path}/in-progress`);
    // } else {
    //   console.log('continua botão de start -lógica a desenvolver');
    // }
  }, [path, apenasId]);

  // const verifyInProgressToDone = useCallback((sohId) => {
  //   const receitaDone = verificaIdNoDoneRecipes(sohId);
  //   if (receitaDone !== undefined) {
  //     if (+(receitaDone.id) === +(sohId)) setcontinueButton(false);
  //     else setcontinueButton(true);
  //   }
  // }, []);

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
              { continueButton ? 'Start Recipe' : 'Continue Recipe' }
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
