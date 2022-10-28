import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const pegaMailLocal = localStorage.getItem('user') || '{}';
    const parsa = JSON.parse(pegaMailLocal) || {};
    const address = parsa.email || '';
    setUserEmail(address);
  }, []);
  // const PreuserEmail = JSON.parse(localStorage.getItem('user')) || { email: '' };
  // const userEmail = PreuserEmail.email;
  // const getUserItem = JSON.parse(localStorage.getItem('user')) || {};
  // console.log(userEmail);
  return (
    <div>
      <Header />
      <div>
        { (userEmail.length > 0) && <h5 data-testid="profile-email">{ userEmail }</h5> }
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
            onClick={ () => localStorage.setItem('user', '') }
          >
            Logoutprofile
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
