import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth.jsx';
import Login from './pages/login/LoginPage.jsx';
import SignUp from './pages/registration/SignUpPage.jsx';
import { routes } from './utils/routes';
import './App.css';
import Main from './pages/main/Main.jsx';

const HomeRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (auth.userData) {
    return children;
  }
  return <Navigate to={routes.login()} state={{ from: location }} />;
};

const App = () => (
  <div className='d-flex flex-column h-100'>
    <Routes>
      <Route path={routes.login()} element={<Login />} />
      <Route path={routes.signup()} element={<SignUp />} />
      <Route
        path={routes.home()}
        element={
          <HomeRoute>
            <Main />
          </HomeRoute>
        }
      />
    </Routes>
  </div>
);
export default App;
