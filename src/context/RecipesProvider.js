import { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import { fetchDrinkBy, fetchMealBy } from '../services/fetchApi';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setsubmitDisabled] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchRadioButton, setSearchRadioButton] = useState('');
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);

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
    if (regex.test(email) && password.length > minCaractereLength) {
      setsubmitDisabled(false);
    } else {
      setsubmitDisabled(true);
    }
  }, [email, password]);

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

  const history = useHistory();
  const submitInfo = useCallback((event) => {
    event.preventDefault();
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify({ email }));
  }, [email, history]);

  const context = useMemo(() => ({
    email,
    password,
    searchString,
    submitDisabled,
    mealsData,
    drinksData,
    useEmail,
    usePassword,
    useSearchString,
    useSearchRadioButton,
    submitInfo,
    tituloPagina,
    searchBar,
    searchBy,
    showSearch,
  }), [email,
    password,
    searchString,
    submitDisabled,
    mealsData,
    drinksData,
    useEmail,
    usePassword,
    useSearchString,
    useSearchRadioButton,
    submitInfo,
    searchBar,
    searchBy,
    showSearch,
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
