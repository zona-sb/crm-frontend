import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signUp/SignUpPage.jsx';
import { routes } from './utils/routes';

const App = () => (
  <BrowserRouter>
    <div className='d-flex flex-column h-100'>
      <Routes>
        <Route path={routes.signup()} element={<Signup />} />
        <Route path={routes.home()} element={<h1>Zona-SB</h1>} />
      </Routes>
    </div>
  </BrowserRouter>
);
export default App;
