import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

const MAX_MAPPED_ITEMS = 12;
const MAX_CATEGORIES = 5;

export default function Meals() {
  const { mealsData, mealsCategories } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <div className="navbar">
        { mealsCategories?.filter((cat, i) => i < MAX_CATEGORIES)
          ?.map((cat) => (
            <button
              type="button"
              key={ cat.strCategory }
              data-testid={ `${cat.strCategory}-category-filter` }
            >
              { cat.strCategory }
            </button>)) }
      </div>
      <main>
        { (mealsData?.length === 1 && mealsData !== null)
        && <Redirect to={ `/meals/${mealsData[0].idMeal}` } />}

        { mealsData?.length > 1 && mealsData?.filter((m, i) => i < MAX_MAPPED_ITEMS)
          ?.map((meal, index) => (
            <Recipes
              index={ index }
              key={ meal.idMeal }
              tag={ meal.strMeal }
              img={ meal.strMealThumb }
            />)) }
      </main>
      <Footer />
    </div>
  );
}
