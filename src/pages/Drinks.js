import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import RecipeCards from '../components/RecipeCards';

const MAX_CATEGORIES = 5;

export default function Drinks() {
  const { drinksData, drinksCategories,
    filterCategory, fetchDrink, searchByCategory } = useContext(RecipesContext);
  return (
    <div>
      <Header drinks />
      <Navbar bg="light" variant="light" style={ { width: '360px' } }>
        <Container>
          <Nav className="me-auto">
            <Nav.Link
              data-testid="All-category-filter"
              onClick={ fetchDrink }
            >
              All
            </Nav.Link>
            { drinksCategories.filter((cat, i) => i < MAX_CATEGORIES)
              ?.map((cat) => (
                <Nav.Link
                  key={ cat.strCategory }
                  data-testid={ `${cat.strCategory}-category-filter` }
                  onClick={ (event) => filterCategory(event, cat.strCategory, 'drinks') }
                  name={ cat.strCategory }
                  variant="success"
                  size="sm"
                >
                  { cat.strCategory }
                </Nav.Link>)) }
          </Nav>
        </Container>
      </Navbar>
      <main>
        { (drinksData?.length === 1 && !searchByCategory)
        && <Redirect to={ `/drinks/${drinksData[0].idDrink}` } /> }
        <RecipeCards data={ drinksData } />
      </main>
      <Footer drinks />
    </div>
  );
}
