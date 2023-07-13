import { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

// Авторизация
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(
    window.localStorage.getItem('userData')
  );

  const logIn = useCallback((data) => {
    window.localStorage.setItem('userData', data);
    setUserData(data);
    setLoggedIn(true);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('userData');
    setUserData(null);
    setLoggedIn(false);
  }, []);
  const value = useMemo(
    () => ({
      userData,
      loggedIn,
      logIn,
      logOut,
    }),
    [logIn, logOut, loggedIn, userData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
