/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: null, // Store accessToken in memory
  });

  const login = (user, accessToken) => {
    console.log(accessToken);
    return setAuth({ isAuthenticated: true, user, accessToken });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
