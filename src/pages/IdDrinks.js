import React, { useEffect, useState } from 'react';
import teste from 'prop-types';
import RecipesDetails from '../components/RecipeDetails';
import { fetchByIdDrink, fetchDrinkBy } from '../services/fetchApi';

export default function IdDrinks(props) {
  const [data, setData] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const fazOFetch = async () => {
      const detalhesDaReceita = await fetchByIdDrink(id);
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
        ehMeal="false"
        recomendados={ recomendados }
      /> }
    </div>
  );
}

IdDrinks.propTypes = {
  match: teste.shape({}),
  params: teste.shape({}),
  id: teste.number,
}.isRequired;
