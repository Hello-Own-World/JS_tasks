import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from './core/contexts/userContext';

import { useState } from 'react';
import '../src/styles.scss';
import Header from './components/header';
import Chat from './pages/chat/chat';
import Home from './pages/home/homePage';
import Login from './pages/user/login';
import Register from './pages/user/register';
import UserInfo from './pages/user/userInfo';
import io from 'socket.io-client';

import { useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('Guest');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`, {
      autoConnect: false,

    });
    setSocket(newSocket);

    return () => {
      if (socket.readyState === 1) {
        newSocket.close();
      }
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.on('session', ({ sessionId, userId }) => {
        socket.auth = sessionId;
        socket.userId = userId;
        localStorage.setItem('sessionId', sessionId);
      });
    }
  }, [socket]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Header />,
      children: [
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login socket={socket} /> },
        { path: '/chat', element: <Chat socket={socket} /> },
        { path: '/home', element: <Home /> },
        { path: '/userInfo', element: <UserInfo socket={socket} /> },
      ],
    },
  ]);

  return (
    <div>
      <UserContext.Provider value={{ username, setUsername }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
