const verificaIdNoDoneRecipes = (id) => {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const doneRecipesParseado = JSON.parse(doneRecipes);
  const findId = doneRecipesParseado?.find((dr) => +(dr.id) === +(id));
  return (findId);
};

const mealInProgress = (id, prev, lista) => {
  const saveThis = {
    ...prev,
    meals: {
      ...prev.meals,
      [id]: lista,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(saveThis));
};

const drinkInProgress = (id, prev, lista) => {
  const saveThis = {
    ...prev,
    drinks: {
      ...prev.drinks,
      [id]: lista,
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(saveThis));
};

const verificaAndamentoDaReceitaESalva = (path, id) => {
  const p = localStorage.getItem('inProgressRecipes');
  const parseado = JSON.parse(p) || { meals: {}, drinks: {} };
  if (path.includes('meal')) {
    const mealKeys = Object.keys(parseado.meals);
    if (mealKeys.find((ci) => ci === id) === undefined) {
      mealInProgress(id, parseado);
    } else {
      return true;
    }
  } else {
    const drinkKeys = Object.keys(parseado.drinks);
    if (drinkKeys.find((ci) => ci === id) === undefined) {
      drinkInProgress(id, parseado);
    } else {
      return true;
    }
    return true;
  }
};

const verificaAndamentoDaReceita = (path, id) => {
  const p = localStorage.getItem('inProgressRecipes');
  const parseado = JSON.parse(p) || { meals: {}, drinks: {} };
  if (path.includes('meal')) {
    const mealKeys = Object.keys(parseado.meals);
    return (mealKeys.find((ci) => ci === id) !== undefined);
  }
  if (path.includes('drink')) {
    const drinkKeys = Object.keys(parseado.drinks);
    return (drinkKeys.find((ci) => ci === id) !== undefined);
  }
};

const saveMealAsFavorite = (data) => {
  const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (getLocal.some((rf) => rf.id === data.idMeal)) {
    // logica de remover do array de favoritos
    getLocal.splice(getLocal.findIndex((rf) => rf.id === data.idMeal), 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(getLocal));
  } else {
    // logica de adicionar ao array de favoritos
    const mockData = [
      ...getLocal,
      {
        id: data.idMeal,
        type: 'meal',
        nationality: data.strArea,
        category: data.strCategory,
        alcoholicOrNot: '',
        name: data.strMeal,
        image: data.strMealThumb,
      }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockData));
  }
};

const saveDrinkAsFavorite = (data) => {
  const getLocal = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (getLocal.some((rf) => rf.id === data.idDrink)) {
    // logica de remover do array de favoritos
    getLocal.splice(getLocal.findIndex((rf) => rf.id === data.idDrink), 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(getLocal));
  } else {
    const mockData = [
      ...getLocal,
      {
        id: data.idDrink,
        type: 'drink',
        nationality: '',
        category: data.strCategory,
        alcoholicOrNot: data.strAlcoholic,
        name: data.strDrink,
        image: data.strDrinkThumb,
      }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockData));
    console.log('salvou no favoriteRecipes:', mockData);
  }
};

export { verificaIdNoDoneRecipes, verificaAndamentoDaReceitaESalva,
  verificaAndamentoDaReceita, saveMealAsFavorite, saveDrinkAsFavorite,
  mealInProgress, drinkInProgress };
