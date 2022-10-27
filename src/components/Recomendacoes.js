import React from 'react';
import teste from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

export default function Recomendacoes(props) {
  const { ehMeal, data } = props;
  const MAX_RECOMMENDATIONS = 6;
  return (
    <Carousel variant="dark">
      { data?.filter((r, index) => index <= MAX_RECOMMENDATIONS).map((re) => (
        <Carousel.Item key={ ehMeal === 'true' ? re.idMeal : re.idDrink }>
          <img
            className="d-block w-100"
            src={ ehMeal === 'true' ? re.strMealThumb : re.strDrinkThumb }
            alt={ ehMeal === 'true' ? re.strMeal : re.strDrink }
          />
          <Carousel.Caption>
            <h5>{ ehMeal === 'true' ? re.strMeal : re.strDrink }</h5>
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
