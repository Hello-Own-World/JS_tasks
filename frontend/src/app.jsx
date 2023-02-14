import React, { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/common/header';
import Chat from './pages/chat/chat';
import Home from './pages/home/homePage';
import Login from './pages/user/login';
import Register from './pages/user/register';
import UserInfo from './pages/user/userInfo';
// import UserContext from './core/logic/authApi';
import '../src/styles.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/chat', element: <Chat /> },
      { path: '/home', element: <Home /> },
      { path: '/userInfo', element: <UserInfo /> },
    ],
  },
]);

export const UserContext = createContext(null);

function App() {
  const [username, setUsername] = useState('Guest');
  return (
    <div>
      <UserContext.Provider value={{ username, setUsername }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
