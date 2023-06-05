/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';
import Chat from '../chat';

import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter

describe('Chat component', () => {
  test('renders without errors', () => {
    render(
      <Router>
        {' '}
        {/* Wrap the component with the Router */}
        <Chat />
      </Router>
    );
    // No error occurred if the component rendered successfully
  });

  test('renders a list of user cards', () => {
    const usersArr = [
      { username: 'user1', userId: 1, status: 'Online' },
      { username: 'user2', userId: 2, status: 'Away' },
    ];
    const { container } = render(
      <Router>
        {' '}
        <Chat usersArr={usersArr} />
      </Router>
    );
    const userCards = container.querySelector('#user_card');
    expect(userCards).toBeInTheDocument();
  });

  test('renders messages correctly', () => {
    const messages = [
      {
        body: 'Hello',
        author: { login: 'user1' },
        updatedAt: new Date().toISOString(),
        _id: 1,
      },
      {
        body: 'Hi there',
        author: { login: 'user2' },
        updatedAt: new Date().toISOString(),
        _id: 2,
      },
    ];
    const { container } = render(
      <Router>
        {' '}
        <Chat messages={messages} />
      </Router>
    );

    // Check if the messages are rendered correctly
    messages.forEach((message) => {
      // Loop through the messages array
      const messageElement = container.querySelector('#messages'); // Get the message element
      expect(messageElement).toBeInTheDocument(); // Check if the message is rendered
    });
  });

  test('displays a loading spinner when loading is true', () => {
    const { container } = render(
      <Router>
        {' '}
        {/* Wrap the component with the Router */}
        <Chat loading={true} />
      </Router>
    );

    const spinnerElement = container.querySelector('#spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('does not display a loading spinner when loading is false', () => {
    render(
      <Router>
        {' '}
        {/* Wrap the component with the Router */}
        <Chat loading={false} />
      </Router>
    );
    const spinnerElement = screen.queryByTestId('spinner');
    expect(spinnerElement).toBeNull();
  });
});
