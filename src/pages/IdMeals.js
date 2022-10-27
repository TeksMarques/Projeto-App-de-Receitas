import React, { useEffect, useState } from 'react';
import teste from 'prop-types';
import RecipesDetails from '../components/RecipeDetails';
import { fetchByIdMeal } from '../services/fetchApi';

export default function IdMeals(props) {
  const [data, setData] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const fazOFetch = async () => {
      const dadoFetchado = await fetchByIdMeal(id);
      setData(dadoFetchado);
    };
    fazOFetch();
  }, [id]);

  return (
    <div>
      { data.length > 0 && <RecipesDetails recipe={ data[0] } ehMeal="true" /> }
    </div>
  );
}

IdMeals.propTypes = {
  match: teste.shape({}),
  params: teste.shape({}),
  id: teste.number,
}.isRequired;
