import React from 'react';
import teste from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
// import Figure from 'react-bootstrap/Figure';

export default function Recomendacoes(props) {
  const { data } = props;
  const MAX_RECOMMENDATIONS = 6;
  return (
    <Carousel variant="dark" interval="1000">
      { data?.filter((r, index) => index < MAX_RECOMMENDATIONS)?.map((re, index) => (
        <Carousel.Item
          key={ re.idMeal || re.idDrink }
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            className="d-block w-100"
            src={ re.strMealThumb || re.strDrinkThumb }
            alt={ re.strMeal || re.strDrink }
          />
          <Carousel.Caption>
            <h5
              data-testid={ `${index}-recommendation-title` }
            >
              { re.strMeal || re.strDrink }
            </h5>
            <p>{ re.category }</p>
          </Carousel.Caption>
        </Carousel.Item>
      )) }
    </Carousel>
  );
}

Recomendacoes.propTypes = {
  data: teste.shape(),
}.isRequired;
