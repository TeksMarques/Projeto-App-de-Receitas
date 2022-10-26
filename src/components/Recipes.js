import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function Recipes(props) {
  const { img, tag, index } = props;
  return (
    <Card data-testid={ `${index}-recipe-card` } style={ { width: '160px' } }>
      <Card.Img
        variant="top"
        src={ img }
        data-testid={ `${index}-card-img` }
      />
      <Card.Body>
        <Card.Title data-testid={ `${index}-card-name` }>{ tag }</Card.Title>
      </Card.Body>
    </Card>
  );
}

Recipes.propTypes = {
  img: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;
