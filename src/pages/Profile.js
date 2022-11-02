import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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

  return (
    <div>
      <Header />
      <section className="profile">
        { (userEmail.length > 0) && <h5 data-testid="profile-email">{ userEmail }</h5> }
        <Link
          to="/done-recipes"
        >
          <Button
            variant="success"
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </Button>
        </Link>
        <Link
          to="/favorite-recipes"
        >
          <Button
            variant="success"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Button>
        </Link>
        <Link
          to="/"
        >
          <Button
            variant="success"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => localStorage.clear() }
          >
            Logout Profile
          </Button>
        </Link>
      </section>
      <Footer profile />
    </div>
  );
}
