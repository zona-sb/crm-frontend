import { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

// Авторизация
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(
    window.localStorage.getItem('userData')
  );

  const logIn = useCallback((data) => {
    console.log(data);
    window.localStorage.setItem('userData', data);
    setUserData(data);
    setLoggedIn(true);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('userData');
    setUserData(null);
    setLoggedIn(false);
  }, []);
  const getAuthHeader = useCallback(() => {
    const token = userData;
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
  }, [userData]);
  const value = useMemo(
    () => ({
      userData,
      loggedIn,
      logIn,
      logOut,
      getAuthHeader,
    }),
    [logIn, logOut, getAuthHeader, loggedIn, userData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
