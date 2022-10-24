import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitDisabled, setsubmitDisabled] = useState(true);
  /* const [users, setUsers] = useState([]); */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const usePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const minCaractereLength = 6;
    if (regex.test(email) && password.length > minCaractereLength) {
      setsubmitDisabled(false);
    } else {
      setsubmitDisabled(true);
    }
  }, [email, password]);

  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submitInfo = (event) => {
    event.preventDefault();
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const context = useMemo(() => ({
    email,
    password,
    submitDisabled,
    useEmail,
    usePassword,
    submitInfo,
  }), [email, password, submitDisabled, useEmail, usePassword, submitInfo]);

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
