import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { drinksData } = useContext(RecipesContext);
  return (
    <div>
      <Header />
      <ul>
        { drinksData.length > 0 && drinksData.map((drink) => (
          <li key={ drink.idDrink }>{ drink.strDrink }</li>)) }
      </ul>
      <Footer />
    </div>
  );
}
