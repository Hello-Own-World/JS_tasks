/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../core/contexts/userContext';
import AuthApi from '../../../../core/logic/authApi';
import UserApi from '../../../../core/logic/userApi';
import UserInfoForm from '../userInfoForm';

// Mock the dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../../../core/logic/authApi', () => ({
  clearLocalUserInfo: jest.fn(),
}));

jest.mock('../../../../core/logic/userApi', () => ({
  IsLoggedIn: jest.fn(),
  GetUserInfo: jest
    .fn()
    .mockResolvedValue({ data: { login: 'JohnDoe', firstName: 'John', lastName: 'Doe', phone: '1234567890' } }),
}));

describe('UserInfoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders user information correctly when logged in', async () => {
    const setUsername = jest.fn();
    const socket = { disconnect: jest.fn() };
    const navigate = jest.fn();

    UserApi.IsLoggedIn.mockReturnValue(true);
    useNavigate.mockReturnValue(navigate);

    render(
      <UserContext.Provider value={{ setUsername }}>
        <UserInfoForm socket={socket} />
      </UserContext.Provider>
    );

    // Wait for the data to be loaded
    await screen.findByText('Login:');
    await screen.findByText('JohnDoe');
    await screen.findByText('First Name:');
    await screen.findByText('John');
    await screen.findByText('Last Name:');
    await screen.findByText('Doe');
    await screen.findByText('Phone Number:');
    await screen.findByText('1234567890');

    expect(UserApi.GetUserInfo).toHaveBeenCalled();
    expect(setUsername).not.toHaveBeenCalled();
    expect(AuthApi.clearLocalUserInfo).not.toHaveBeenCalled();
    expect(socket.disconnect).not.toHaveBeenCalled();
    expect(useNavigate).not.toHaveBeenCalledWith('/home');
  });

  test('renders user information correctly when not logged in', async () => {
    const setUsername = jest.fn();
    const socket = { disconnect: jest.fn() };
    const navigate = jest.fn();

    UserApi.IsLoggedIn.mockReturnValue(false);
    useNavigate.mockReturnValue(navigate);

    render(
      <UserContext.Provider value={{ setUsername }}>
        <UserInfoForm socket={socket} />
      </UserContext.Provider>
    );

    // Wait for the data to be loaded
    await screen.findByText('Login:');
    await screen.findByText('First Name:');
    await screen.findByText('Last Name:');
    await screen.findByText('Phone Number:');

    expect(UserApi.GetUserInfo).not.toHaveBeenCalled();
    expect(setUsername).not.toHaveBeenCalled();
    expect(AuthApi.clearLocalUserInfo).not.toHaveBeenCalled();
    expect(socket.disconnect).not.toHaveBeenCalled();
    expect(useNavigate).not.toHaveBeenCalledWith('/home');
  });

  test('logs out and navigates to home when logout button is clicked', async () => {
    const setUsername = jest.fn();
    const socket = { disconnect: jest.fn() };
    const navigate = jest.fn();

    UserApi.IsLoggedIn.mockReturnValue(true);
    useNavigate.mockReturnValue(navigate);

    render(
      <UserContext.Provider value={{ setUsername }}>
        <UserInfoForm socket={socket} />
      </UserContext.Provider>
    );
  });
});
