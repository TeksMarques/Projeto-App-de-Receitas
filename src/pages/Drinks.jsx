import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

const MAX_INDEX = 12;
const MAX_CATEGORIES = 5;

export default function Drinks() {
  const { drinksData, drinksCategories } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <div className="navbar">
        { drinksCategories.filter((cat, i) => i < MAX_CATEGORIES)
          ?.map((cat) => (
            <span
              key={ cat.strCategory }
            >
              { cat.strCategory }
            </span>)) }
      </div>
      <main>
        { drinksData?.length === 1
        && <Redirect to={ `/drinks/${drinksData[0].idDrink}` } />}
        { drinksData?.map((drink, index) => index < MAX_INDEX && (
          <Recipes
            index={ index }
            key={ drink.idDrink }
            tag={ drink.strDrink }
            img={ drink.strDrinkThumb }
          />)) }
      </main>
      <Footer />
    </div>
  );
}
