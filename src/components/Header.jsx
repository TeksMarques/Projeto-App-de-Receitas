import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';

export default function Header() {
  const { tituloPagina } = useContext(RecipesContext);
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

      <img
        className="search-top"
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="serach icon"
      />

      <span data-testid="spanage-title">
        { tituloPagina(history) }
      </span>

    </header>
  );
}
