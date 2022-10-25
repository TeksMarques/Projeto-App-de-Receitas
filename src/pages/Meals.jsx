import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import CardRecipes from '../components/CardRecipes';

export default function Meals() {
  const { mealsData } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      { (mealsData.length === 1 && mealsData !== null)
       && <Redirect to={ `/meals/${mealsData[0].idMeal}` } />}

      { mealsData.length > 1 && mealsData?.map((meal, index) => (
        <CardRecipes
          index={ index }
          key={ meal.idMeal }
          tag={ meal.strMeal }
          img={ meal.strMealThumb }
        />)) }

      <Footer />
    </div>
  );
}
