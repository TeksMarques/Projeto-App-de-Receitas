const verificaIdNoDoneRecipes = (id) => {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipesParseado = JSON.parse(doneRecipes);
  const findId = doneRecipesParseado?.find((dr) => +(dr.id) === +(id));
  return (findId);
};

const savlvaDadosLocalStorage = () => {
  const salvaDados = localStorage.setItem('inProgressRecipes', {
    drinks: {
      idDaBebida: [listaDeIngredientesUtilizados],
    },
    meals: {
      idDaComida: [listaDeIngredientesUtilizados],
    },
  });
  return salvaDados;
};

export { verificaIdNoDoneRecipes, savlvaDadosLocalStorage };
