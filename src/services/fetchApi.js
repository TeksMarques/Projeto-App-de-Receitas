const fetchMealBy = async (modo, valor) => {
  let endpoint = '';
  if (modo === 'byIngredients') { endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valor}`; }
  if (modo === 'byName') { endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valor}`; }
  if (modo === 'byFirstLetter') { endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valor}`; }
  try {
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson.meals;
  } catch (err) {
    throw new Error(err);
  }
};

const fetchDrinkBy = async (modo, valor) => {
  let endpoint = '';
  if (modo === 'byIngredients') { endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valor}`; }
  if (modo === 'byName') { endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valor}`; }
  if (modo === 'byFirstLetter') { endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valor}`; }
  try {
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.drinks;
  } catch (err) {
    throw new Error(err);
  }
};

export { fetchMealBy, fetchDrinkBy };
