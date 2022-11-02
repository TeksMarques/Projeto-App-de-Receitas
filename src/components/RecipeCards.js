import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import teste from 'prop-types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function RecipeCards(props) {
  const [ehMeal, setEhMeal] = useState(true);
  const { data } = props;
  const { location: { pathname } } = useHistory();
  useEffect(() => {
    if (pathname.includes('drink')) setEhMeal(false);
  }, [pathname]);

  const MAX_MAPPED_ITEMS = 12;
  return (
    <Row xs={ 2 } md={ 1 } className="g-4">
      { data.map((item, idx) => (idx < MAX_MAPPED_ITEMS) && (
        <Col key={ idx }>
          <Link
            to={ ehMeal
              ? (`${pathname}/${item.idMeal}`)
              : (`${pathname}/${item.idDrink}`) }
          >
            <Card>
              <Card.Img
                variant="top"
                src={ item.strMealThumb || item.strDrinkThumb }
              />
              <Card.Body>
                <Card.Title>{ item.strMeal || item.strDrink }</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

RecipeCards.propTypes = {
  data: teste.shape({}),
}.isRequired;
