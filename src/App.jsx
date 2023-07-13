import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import AuthProvider from './providers/auth.js';
import useAuth from './hooks/useAuth.jsx';
import Login from './pages/login/loginPage.jsx';
import Signup from './pages/signUp/SignUpPage.jsx';
import { routes } from './utils/routes';

const HomeRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (auth.userData) {
    return children;
  }
  return <Navigate to={routes.login()} state={{ from: location }} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className='d-flex flex-column h-100'>
        <Routes>
          <Route path={routes.login()} element={<Login />} />
          <Route path={routes.signup()} element={<Signup />} />
          <Route
            path={routes.home()}
            element={
              <HomeRoute>
                <h1>Zona-SB</h1>
              </HomeRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);
export default App;
