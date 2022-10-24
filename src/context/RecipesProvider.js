import { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setsubmitDisabled] = useState(true);
  /* const [users, setUsers] = useState([]); */

  const useEmail = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const usePassword = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

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

  const history = useHistory();
  const submitInfo = useCallback((event) => {
    event.preventDefault();
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify({ email }));
  }, [email, history]);

  const context = useMemo(() => ({
    email,
    password,
    submitDisabled,
    useEmail,
    usePassword,
    submitInfo,
    tituloPagina,
  }), [email,
    password,
    submitDisabled,
    useEmail,
    usePassword,
    submitInfo,
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
