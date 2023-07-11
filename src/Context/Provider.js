import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const context = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    isFormValid,
    setIsFormValid,
  }), [
    email,
    setEmail,
    password,
    setPassword,
    isFormValid,
    setIsFormValid,
  ]);

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
