import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from './core/contexts/userContext';
import { ChatContext } from './core/contexts/chatContext';

import { useState } from 'react';
import '../src/styles.scss';
import Header from './components/header';
import Chat from './pages/chat/chat';
import Home from './pages/home/homePage';
import Login from './pages/user/login';
import Register from './pages/user/register';
import UserInfo from './pages/user/userInfo';

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

function App() {
  const [username, setUsername] = useState('Guest');
  const [userArray, setUserArray] = useState([]);
  const [msgArray, setMsgArray] = useState([]);

  return (
    <div>
      <UserContext.Provider value={{ username, setUsername }}>
        <ChatContext.Provider value={{ userArray, setUserArray, msgArray, setMsgArray }}>
          <RouterProvider router={router} />
        </ChatContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
