import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

const MAX_INDEX = 12;
export default function Drinks() {
  const { drinksData } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      { drinksData.length === 1 && <Redirect to={ `/drinks/${drinksData[0].idDrink}` } />}
      <ul>
        { drinksData.map((drink, index) => index < MAX_INDEX && (
          <Recipes
            index={ index }
            key={ drink.idDrink }
            tag={ drink.strDrink }
            img={ drink.strDrinkThumb }
          />)) }
      </ul>
      <Footer />
    </div>
  );
}
