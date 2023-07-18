import React from 'react';
import { useLocation } from 'react-router-dom';
import Drinks from './Drinks';
import Footer from './Footer';
import Meals from './Meals';

export default function Recipes() {
  const location = useLocation();

  const isDrinksPage = () => location.pathname === '/drinks';

  return (
    <div>
      {
        isDrinksPage()
          ? <Drinks />
          : <Meals />
      }
      <Footer />
    </div>

  );
}
