import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="profile-email">{ email }</h3>
        <Link
          to="/done-recipes"
        >
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link
          to="/favorite-recipes"
        >
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <Link
          to="/"
        >
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
