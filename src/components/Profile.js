import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setUserEmail(email);
  }, []);

  return (
    <div>
      <Header />
      <h3 data-testid="profile-email">
        {userEmail}
      </h3>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </div>

  );
}

export default Profile;
