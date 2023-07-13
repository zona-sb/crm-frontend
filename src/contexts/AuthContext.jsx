import { createContext } from 'react';

const AuthContext = createContext({
  userData: null,
  loggedIn: null,
  logIn: () => { },
  logOut: () => { },
});

export default AuthContext;
