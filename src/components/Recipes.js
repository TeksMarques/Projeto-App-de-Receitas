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
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    // <div data-testid={ `${index}-recipe-card` }>
    //   <img data-testid={ `${index}-card-img` } src={ img } alt={ tag } />
    //   <h1 data-testid={ `${index}-card-name` }>{ tag }</h1>
    // </div>
  );
}

Recipes.propTypes = {
  img: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;
