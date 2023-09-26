import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { routes } from './utils/routes';
import useAuth from './hooks/useAuth.jsx';
import Login from './pages/login/LoginPage.jsx';
import SignUp from './pages/registration/SignUpPage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import PrioritiesPage from './pages/priorities/PrioritiesPage.jsx';
import CategoriesPage from './pages/categories/CategoriesPage.jsx';
import StatusesPage from './pages/statuses/StatusesPage.jsx';
import WorkersPage from './pages/workers/WorkersPage.jsx';
import ClientsPage from './pages/clients/ClientsPage.jsx';
import Navigation from './components/navigation/Navigation.jsx';
import TasksPage from './pages/tasks/TasksPage.jsx';
import OrdersPage from './pages/orders/OrdersPage';
import './App.css';

const Protection = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (auth.userData) {
    return children;
  }
  return <Navigate to={routes.login()} state={{ from: location }} />;
};

const App = () => (
  <Routes>
    <Route
      path={routes.main()}
      element={
        <Protection>
          <Navigation />
        </Protection>
      }
    >
      <Route index element={<HomePage />} />
      <Route path={routes.orders()} element={<OrdersPage />} />
      <Route path={routes.clients()} element={<ClientsPage />} />
      <Route path={routes.workers()} element={<WorkersPage />} />
      <Route path={routes.tasks()} element={<TasksPage />}>
        <Route path={routes.categories()} element={<CategoriesPage />} />
        <Route path={routes.statuses()} element={<StatusesPage />} />
        <Route path={routes.priorities()} element={<PrioritiesPage />} />
      </Route>
    </Route>
    <Route path={routes.login()} element={<Login />} />
    <Route path={routes.signup()} element={<SignUp />} />
  </Routes>
);
export default App;
