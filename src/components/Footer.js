import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/meals">
        <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </Link>
    </footer>
  );
}
