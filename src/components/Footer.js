import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <div
      className="footer"
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: '10px',
      } }
    >
      <a href="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="Comidas"
          style={ { width: '30px', marginRight: '10px' } }
        />
      </a>
      <a href="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Bebidas"
          style={ { width: '30px' } }
        />
      </a>
    </div>
  );
}

export default Footer;
