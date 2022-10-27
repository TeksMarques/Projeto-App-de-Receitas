import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import IdMeals from './pages/IdMeals';
import IdDrinks from './pages/IdDrinks';
import IdMealsInProgress from './pages/IdMealsInProgress';
import IdDrinksInProgress from './pages/IdDrinksInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/meals/:id" component={ IdMeals } />
          <Route path="/drinks/:id" component={ IdDrinks } />
          <Route
            exact
            path="/meals/:id-da-receita/in-progress"
            component={ IdMealsInProgress }
          />
          <Route
            exact
            path="/drinks/:id-da-receita/in-progress"
            component={ IdDrinksInProgress }
          />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </div>
  );
}

export default App;
