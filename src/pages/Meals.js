import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

const MAX_MAPPED_ITEMS = 12;
const MAX_CATEGORIES = 5;

export default function Meals() {
  const { mealsData, mealsCategories,
    filterCategory, fetchMeal, searchByCategory } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <div className="navbar">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ fetchMeal }
        >
          All
        </button>
        { mealsCategories?.filter((cat, i) => i < MAX_CATEGORIES)
          ?.map((cat) => (
            <button
              type="button"
              key={ cat.strCategory }
              data-testid={ `${cat.strCategory}-category-filter` }
              onClick={ (event) => filterCategory(event, cat.strCategory, 'meals') }
              name={ cat.strCategory }
            >
              { cat.strCategory }
            </button>)) }
      </div>
      <main>
        { (mealsData?.length === 1 && !searchByCategory)
        && <Redirect to={ `/meals/${mealsData[0].idMeal}` } />}

        { mealsData?.filter((m, i) => i < MAX_MAPPED_ITEMS)
          ?.map((meal, index) => (
            <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
              <Recipes
                index={ index }
                tag={ meal.strMeal }
                img={ meal.strMealThumb }
              />
            </Link>)) }
      </main>
      <Footer />
    </div>
  );
}
