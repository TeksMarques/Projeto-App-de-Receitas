import { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { fetchDrinkBy, fetchMealBy, fetchByMealCategory, fetchByDrinkCategory,
  fetchMealCategories, fetchDrinkCategories } from '../services/fetchApi';

function RecipesProvider({ children }) {
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setsubmitDisabled] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchRadioButton, setSearchRadioButton] = useState('');
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [searchByCategory, setsearchByCategory] = useState(false);
  const [filtroAtivado, setFiltroAtivado] = useState('');

  const useEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const usePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const useSearchString = useCallback(({ target: { value } }) => {
    setSearchString(value);
  }, []);

  const useSearchRadioButton = useCallback(({ target: { value } }) => {
    setSearchRadioButton(value);
  }, []);

  const searchBy = useCallback(async (estouEm) => {
    setsearchByCategory(false);
    if (searchRadioButton === 'byFirstLetter' && searchString.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (estouEm === '/meals') {
      const response = await fetchMealBy(searchRadioButton, searchString);
      if (response === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setMealsData(response);
    } else {
      const response = await fetchDrinkBy(searchRadioButton, searchString);
      if (response === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      setDrinksData(response);
    }
  }, [searchRadioButton, searchString]);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const minCaractereLength = 6;
    if (regex.test(userEmail) && password.length > minCaractereLength) {
      setsubmitDisabled(false);
    } else {
      setsubmitDisabled(true);
    }
  }, [userEmail, password]);

  const fetchMeal = useCallback(async () => {
    const getMeal = await fetchMealBy(false, false);
    setMealsData(getMeal);
    setFiltroAtivado('');
    setsearchByCategory(false);
  }, []);

  const fetchDrink = useCallback(async () => {
    const getDrink = await fetchDrinkBy(false, false);
    setDrinksData(getDrink);
    setFiltroAtivado('');
    setsearchByCategory(false);
  }, []);

  useEffect(() => {
    async function fazoFetch() {
      const fetchMealCat = await fetchMealCategories();
      const fetchDrinkCat = await fetchDrinkCategories();
      setMealsCategories(fetchMealCat);
      setDrinksCategories(fetchDrinkCat);
    }
    fazoFetch();
    fetchMeal();
    fetchDrink();
  }, [fetchMeal, fetchDrink]);

  const tituloPagina = ({ location: { pathname } }) => {
    switch (pathname) {
    case '/meals': return 'Meals';
    case '/drinks': return 'Drinks';
    case '/profile': return 'Profile';
    case '/done-recipes': return 'Done Recipes';
    case '/favorite-recipes': return 'Favorite Recipes';
    default: return 'Titulo da página';
    }
  };

  const showSearch = useCallback(() => {
    setSearchBar(!searchBar);
  }, [searchBar]);

  const filterCategory = useCallback(async (event, category, page) => {
    if (page === 'drinks' && filtroAtivado === category) {
      setFiltroAtivado('');
      setsearchByCategory(false);
      fetchDrink();
    }
    if (page === 'drinks' && filtroAtivado !== category) {
      setFiltroAtivado(event.target.name);
      setsearchByCategory(true);
      setDrinksData(await fetchByDrinkCategory(category));
    }
    if (page === 'meals' && filtroAtivado === category) {
      setFiltroAtivado('');
      setsearchByCategory(false);
      fetchMeal();
    }
    if (page === 'meals' && filtroAtivado !== category) {
      setFiltroAtivado(event.target.name);
      setsearchByCategory(true);
      setMealsData(await fetchByMealCategory(category));
    }
  }, [filtroAtivado, fetchDrink, fetchMeal]);

  const history = useHistory();
  const submitInfo = useCallback((event) => {
    event.preventDefault();
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
  }, [userEmail, history]);

  const context = useMemo(() => ({
    userEmail,
    password,
    searchString,
    submitDisabled,
    mealsData,
    drinksData,
    mealsCategories,
    drinksCategories,
    searchBar,
    useEmail,
    usePassword,
    useSearchString,
    useSearchRadioButton,
    submitInfo,
    tituloPagina,
    searchBy,
    showSearch,
    filterCategory,
    fetchMeal,
    fetchDrink,
    searchByCategory,
    filtroAtivado,
  }), [userEmail,
    password,
    searchString,
    submitDisabled,
    mealsData,
    drinksData,
    mealsCategories,
    drinksCategories,
    searchBar,
    useEmail,
    usePassword,
    useSearchString,
    useSearchRadioButton,
    submitInfo,
    searchBy,
    showSearch,
    filterCategory,
    fetchMeal,
    fetchDrink,
    searchByCategory,
    filtroAtivado,
  ]);

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
