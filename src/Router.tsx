import React, { FC, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Customers from './components/Customers';
import Error404 from './components/Error404';
import Home from './components/Home';
import Navbar from './components/layout/Navbar';
import AuthContext from './context/AuthContext';

const Router: FC = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }
  const loggedIn = context.loggedIn;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
          Home
        </Route>
        {loggedIn === false && (
          <>
            <Route path='/register' element={<Register />}>
              Register
            </Route>
            <Route path='/login' element={<Login />}>
              Login
            </Route>
          </>
        )}

        {loggedIn === true && (
          <>
            <Route path='/customers' element={<Customers />}>
              Customers
            </Route>{' '}
          </>
        )}
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
