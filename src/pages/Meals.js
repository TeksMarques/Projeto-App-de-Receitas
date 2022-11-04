import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
// import Recipes from '../components/Recipes';
import RecipeCards from '../components/RecipeCards';

// const MAX_MAPPED_ITEMS = 12;
const MAX_CATEGORIES = 5;

export default function Meals() {
  const { mealsData, mealsCategories,
    filterCategory, fetchMeal, searchByCategory } = useContext(RecipesContext);
  return (
    <>
      <Header meals />
      <Navbar bg="light" variant="light" style={ { width: '360px' } }>
        <Container>
          <Nav className="me-auto">
            <Nav.Link
              data-testid="All-category-filter"
              onClick={ fetchMeal }
            >
              All
            </Nav.Link>
            { mealsCategories?.filter((mc, i) => i < MAX_CATEGORIES)
              ?.map((cat) => (
                <Nav.Link
                  variant="success"
                  size="sm"
                  key={ cat.strCategory }
                  data-testid={ `${cat.strCategory}-category-filter` }
                  onClick={ (event) => filterCategory(event, cat.strCategory, 'meals') }
                  name={ cat.strCategory }
                >
                  { cat.strCategory }
                </Nav.Link>
              )) }

          </Nav>
        </Container>
      </Navbar>
      <main>
        { (mealsData?.length === 1 && !searchByCategory)
        && <Redirect to={ `/meals/${mealsData[0].idMeal}` } />}
        <RecipeCards data={ mealsData } />
      </main>
      <Footer meals />
    </>
  );
}
