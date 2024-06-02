import { createContext, useState, useContext } from "react";

const AuthContext = createContext({
    token: null
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('cyc_token') ?? null);

  const setTokenHandler = (token) => {
    setToken(token);
    token && localStorage.setItem('cyc_token', token);
  }

  const unsetToken = () => {
    setToken(null);
    localStorage.removeItem('cyc_token');
  }

  const value = {
    token,
    setToken: setTokenHandler,
    unsetToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
