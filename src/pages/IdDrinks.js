import React, { useEffect, useState } from 'react';
import teste from 'prop-types';
import RecipesDetails from '../components/RecipeDetails';
import { fetchByIdDrink } from '../services/fetchApi';

export default function IdDrinks(props) {
  const [data, setData] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const fazOFetch = async () => {
      const dadoFetchado = await fetchByIdDrink(id);
      setData(dadoFetchado);
    };
    fazOFetch();
  }, [id]);

  return (
    <div>
      { data.length > 0 && <RecipesDetails recipe={ data[0] } ehMeal="false" /> }
    </div>
  );
}

IdDrinks.propTypes = {
  match: teste.shape({}),
  params: teste.shape({}),
  id: teste.number,
}.isRequired;
