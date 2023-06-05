/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { UserContext } from '../../../../core/contexts/userContext';
import LoginForm from '../loginForm';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginForm component', () => {
  const mockSetError = jest.fn();
  const mockNavigate = jest.fn();

  const mockSocket = {
    auth: {},
    connect: jest.fn(),
  };

  const mockUserApi = {
    Login: jest.fn(() =>
      Promise.resolve({
        data: {
          login: 'testuser',
          token: 'abcdefg',
          userId: 1,
        },
      })
    ),
  };

  beforeEach(() => {
    mockSetError.mockClear();
    mockNavigate.mockClear();
    mockSocket.connect.mockClear();
    mockUserApi.Login.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders login form with empty fields', () => {
    const { getByLabelText, getByText } = render(<LoginForm setError={mockSetError} socket={mockSocket} />);

    const loginInput = getByLabelText('Login:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    expect(loginInput.value).toBe('');
    expect(passwordInput.value).toBe('');
    expect(loginButton).toBeInTheDocument();
  });

  test('displays error message for wrong input', async () => {
    const { getByLabelText, getByText } = render(<LoginForm setError={mockSetError} socket={mockSocket} />);

    const loginButton = getByText('Login');

    fireEvent.submit(loginButton);

    await waitFor(() => expect(mockSetError).toHaveBeenCalledTimes(1));

    expect(mockSetError).toHaveBeenCalledWith({ title: 'Invalid input', message: 'Please enter all data' });
    expect(mockUserApi.Login).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('submits login form with valid input', async () => {
    // Mock the user API
    mockUserApi.Login.mockResolvedValueOnce();

    const { getByLabelText, getByText } = render(<LoginForm setError={mockSetError} socket={mockSocket} />);

    const loginInput = getByLabelText('Login:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    // Set the input values
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Submit the form
    fireEvent.submit(loginButton);

    // Wait for the async Login function to complete
    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledTimes(0);
      console.log('mockUserApi.Login calls:', mockUserApi.Login.mock.calls.length);
    });
  });
});
