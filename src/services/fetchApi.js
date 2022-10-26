const fetchMealBy = async (modo, valor) => {
  let endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  if (modo === 'byIngredients') { endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valor}`; }
  if (modo === 'byName') { endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valor}`; }
  if (modo === 'byFirstLetter') { endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valor}`; }
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  return responseJson.meals;
};

const fetchDrinkBy = async (modo, valor) => {
  let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  if (modo === 'byIngredients') { endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${valor}`; }
  if (modo === 'byName') { endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valor}`; }
  if (modo === 'byFirstLetter') { endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${valor}`; }
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  return responseJson.drinks;
};

const fetchMealCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const responseJson = await response.json();
  return responseJson.meals;
};

const fetchDrinkCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const responseJson = await response.json();
  return responseJson.drinks;
};

export { fetchMealBy, fetchDrinkBy, fetchMealCategories, fetchDrinkCategories };
