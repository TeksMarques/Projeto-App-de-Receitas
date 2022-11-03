import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import teste from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';
import Search from './Search';
import logo from '../img/T_DoceLogo.png';

export default function Header(props) {
  const { tituloPagina, searchBar, showSearch,
    redirectToProfile } = useContext(RecipesContext);
  const { meals, drinks } = props;
  const history = useHistory();
  return (
    <header>
      <div className="header-icons">
        <div>
          <img className="imglogo-header" src={ logo } alt="Logo" />
        </div>
      </div>
      <div className="header-profile-search2">
        <div className="header-profile-search">
          <button
            type="button"
            onClick={ redirectToProfile }
            className="search-top"
          >
            <img
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="Profile"
            />
          </button>
          { (meals || drinks)
          && (
            <button
              type="button"
              onClick={ showSearch }
              className="search-top"
            >
              <img
                src={ searchIcon }
                data-testid="search-top-btn"
                alt="Search"
              />
            </button>)}
        </div>
        <h1 className="titulo-pagina" data-testid="page-title">
          { tituloPagina(history) }
        </h1>
      </div>
      <div>
        { searchBar && <Search /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  meals: teste.bool,
  drinks: teste.bool,
}.isRequired;
