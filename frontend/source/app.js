import React from 'react';

import Register from './components/pages/user/register';
import Login from './components/pages/user/login';
import Home from './components/pages/home/HomePage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/register', element: <Register /> },
  { path: '/login', element: <Login /> }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
