import React, { useState, createContext } from 'react';

import Register, { action as CreateUserAction } from './components/pages/user/register';
import Login from './components/pages/user/login';
import Home from './components/pages/home/HomePage';
import Chat from './components/pages/chat/chat';
import Header from './components/UI/Header';
import UserInfo from './components/pages/user/UserInfo';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { path: '/register', element: <Register />, action: CreateUserAction },
      { path: '/login', element: <Login /> },
      { path: '/chat', element: <Chat /> },
      { path: '/home', element: <Home /> },
      { path: '/userInfo', element: <UserInfo /> }
    ]
  }
]);

export const UserContext = createContext(null);

const App = () => {
  const [username, setUsername] = useState('Guest');

  return (
    <div>
      <UserContext.Provider value={[username, setUsername]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
};

export default App;
