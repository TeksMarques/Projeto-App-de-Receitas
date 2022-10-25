const fetchBy = async (modo, valor) => {
  let endpoint = '';
  if (modo === 'byIngredients') { endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${valor}`; }
  if (modo === 'byName') { endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${valor}`; }
  if (modo === 'byFirstLetter') { endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${valor}`; }
  try {
    const response = await fetch(endpoint);
    const responseJson = await response.json();
    return responseJson.meals;
  } catch (err) {
    throw new Error(err);
  }
};

export default fetchBy;
