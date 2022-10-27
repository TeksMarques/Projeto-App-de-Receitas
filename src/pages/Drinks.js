import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

const MAX_INDEX = 12;
const MAX_CATEGORIES = 5;

export default function Drinks() {
  const { drinksData, drinksCategories,
    filterCategory, fetchDrink, searchByCategory } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <div className="navbar">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ fetchDrink }
        >
          All
        </button>
        { drinksCategories.filter((cat, i) => i < MAX_CATEGORIES)
          ?.map((cat) => (
            <button
              type="button"
              key={ cat.strCategory }
              data-testid={ `${cat.strCategory}-category-filter` }
              onClick={ (event) => filterCategory(event, cat.strCategory, 'drinks') }
              name={ cat.strCategory }
            >
              { cat.strCategory }
            </button>)) }
      </div>
      <main>
        { drinksData?.length === 1 && !searchByCategory
        && <Redirect to={ `/drinks/${drinksData[0].idDrink}` } />}
        { drinksData?.map((drink, index) => index < MAX_INDEX && (
          <Link to={ `/drinks/${drink.idDrink}` } key={ drink.idDrink }>
            <Recipes
              index={ index }
              tag={ drink.strDrink }
              img={ drink.strDrinkThumb }
            />
          </Link>)) }
      </main>
      <Footer />
    </div>
  );
}