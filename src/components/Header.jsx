import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import Search from './Search';

export default function Header() {
  const { tituloPagina, searchBar, showSearch } = useContext(RecipesContext);

  const history = useHistory();
  return (
    <header>
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="icone de perfil"
          data-testid="profile-top-btn"
        />
      </Link>

      { ((history.location.pathname === '/meals')
      || (history.location.pathname === '/drinks'))
      && (
        <button
          type="button"
          onClick={ showSearch }
        >
          <img
            className="search-top"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="serach icon"
          />
        </button>)}

      <span data-testid="page-title">
        { tituloPagina(history) }
      </span>

      { searchBar && <Search /> }

    </header>
  );
}
