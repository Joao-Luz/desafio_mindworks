import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    user, authenticated, loading, setUser, handleLogin, handleLogout, handleRegister, handleEdit
  } = useAuth();

  return (
    <Context.Provider value={{ user, loading, authenticated, setUser, handleLogin, handleLogout, handleRegister, handleEdit }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };