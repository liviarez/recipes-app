import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user') || '{}');
    setUserEmail(email);
  }, []);

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">
        {userEmail}
      </h3>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
