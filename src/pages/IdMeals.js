import React, { useEffect, useState } from 'react';
import teste from 'prop-types';
import RecipesDetails from '../components/RecipeDetails';
import { fetchByIdMeal, fetchDrinkBy } from '../services/fetchApi';

export default function IdMeals(props) {
  const [data, setData] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const fazOFetch = async () => {
      const detalhesDaReceita = await fetchByIdMeal(id);
      const recomendacoes = await fetchDrinkBy();
      setData(detalhesDaReceita);
      setRecomendados(recomendacoes);
    };
    fazOFetch();
  }, [id]);

  return (
    <div>
      { data.length > 0
      && <RecipesDetails
        recipe={ data[0] }
        ehMeal="true"
        recomendados={ recomendados }
      /> }
    </div>
  );
}

IdMeals.propTypes = {
  match: teste.shape({}),
  params: teste.shape({}),
  id: teste.number,
}.isRequired;
