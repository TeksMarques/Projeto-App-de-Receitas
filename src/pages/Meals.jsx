import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';

const MAX_MAPPED_ITEMS = 12;

export default function Meals() {
  const { mealsData, mealsCategories } = useContext(RecipesContext);
  const MAX_CATEGORIES = 5;
  return (
    <div>
      <Header />
      <navbar>
        { mealsCategories.filter((cat, i) => i < MAX_CATEGORIES)
          ?.map((cat) => (
            <span
              key={ cat.strCategory }
            >
              { cat.strCategory }
            </span>)) }
      </navbar>
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
