import React from 'react';

import Register, { action as CreateUserAction } from './components/pages/user/register';
import Login, { action as LoginUserAction } from './components/pages/user/login';
import Home from './components/pages/home/HomePage';
import Chat from './components/pages/chat/chat';
import Header from './components/UI/Header';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { path: '/register', element: <Register />, action: CreateUserAction },
      { path: '/login', element: <Login />, action: LoginUserAction },
      { path: '/chat', element: <Chat /> },
      { path: '/home', element: <Home /> }
    ]
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
