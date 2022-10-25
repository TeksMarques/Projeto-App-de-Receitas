import React from 'react';
import PropTypes from 'prop-types';

export default function CardRecipes(props) {
  const { img, tag, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ img } alt={ tag } />
      <h1 data-testid={ `${index}-card-name` }>{ tag }</h1>
    </div>
  );
}

CardRecipes.propTypes = {
  img: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;
