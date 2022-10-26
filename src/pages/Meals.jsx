import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
// import { fetchMeals } from '../services/fetchApi';

export default function Meals() {
  const { mealsData } = useContext(RecipesContext);
  // const [mealsRecipes, setMealsRecipes] = useState([]);

  // useEffect(() => {
  //   async fetchMeals();
  // }, []);

  return (
    <div>
      <Header />
      { (mealsData?.length === 1 && mealsData !== null)
       && <Redirect to={ `/meals/${mealsData[0].idMeal}` } />}

      { mealsData?.length > 1 && mealsData?.map((meal, index) => (
        <Recipes
          index={ index }
          key={ meal.idMeal }
          tag={ meal.strMeal }
          img={ meal.strMealThumb }
        />)) }

      <Footer />
    </div>
  );
}
