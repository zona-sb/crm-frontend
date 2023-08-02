import React from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  NavLink,
} from 'react-router-dom';
import useAuth from './hooks/useAuth.jsx';
import Login from './pages/login/LoginPage.jsx';
import SignUp from './pages/registration/SignUpPage.jsx';
import { routes } from './utils/routes';
import HomePage from './pages/home/HomePage.jsx';
import PrioritiesPage from './pages/priorities/PrioritiesPage.jsx';
import CategoriesPage from './pages/categories/CategoriesPage.jsx';
import StatusesPage from './pages/statuses/StatusesPage.jsx';
import WorkersPage from './pages/workers/WorkersPage.jsx';
import ClientsPage from './pages/clients/ClientsPage.jsx';
import './App.css';

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
    <div className='d-flex gap-2'>
      <NavLink to={routes.home()}>Главная</NavLink>
      <NavLink to={routes.login()}>Вход</NavLink>
      <NavLink to={routes.signup()}>Регистрация</NavLink>
      <NavLink to={routes.priorities()}>Приоритеты</NavLink>
      <NavLink to={routes.categories()}>Категории</NavLink>
      <NavLink to={routes.statuses()}>Статусы</NavLink>
      <NavLink to={routes.workers()}>Монтажники</NavLink>
      <NavLink to={routes.clients()}>Клиенты</NavLink>
    </div>

    <Routes>
      <Route path={routes.priorities()} element={<PrioritiesPage />} />
      <Route path={routes.categories()} element={<CategoriesPage />} />
      <Route path={routes.statuses()} element={<StatusesPage />} />
      <Route path={routes.workers()} element={<WorkersPage />} />
      <Route path={routes.clients()} element={<ClientsPage />} />
      <Route path={routes.login()} element={<Login />} />
      <Route path={routes.signup()} element={<SignUp />} />
      <Route
        path={routes.home()}
        element={
          <HomeRoute>
            <HomePage />
          </HomeRoute>
        }
      />
    </Routes>
  </div>
);
export default App;
