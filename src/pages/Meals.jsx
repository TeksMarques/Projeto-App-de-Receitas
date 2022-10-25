import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';

export default function Meals() {
  const { mealsData } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <ul>
        { mealsData.length > 0 && mealsData.map((meal) => (
          <li key={ meal.idMeal }>{ meal.strMeal }</li>)) }
      </ul>
      <Footer />
    </div>
  );
}
