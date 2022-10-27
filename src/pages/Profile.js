import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const userEmail = Object.values(JSON.parse(localStorage.getItem('user')));
  console.log(userEmail);
  return (
    <div>
      <Header />
      <div>
        <h3 data-testid="profile-email">{ userEmail[0] }</h3>
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
