/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import UserApi from '../../../../core/logic/userApi';
import UserInfo from '../userInfo';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  navigate: jest.fn(),
}));

jest.mock('../../../../core/logic/userApi', () => ({
  IsLoggedIn: jest.fn(),
  GetUserInfo: jest.fn(),
}));

describe('UserInfo component', () => {
  test('renders user info form if logged in', () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);

    const { container } = render(
      <MemoryRouter initialEntries={['/userinfo']} initialIndex={0}>
        <UserInfo />
      </MemoryRouter>
    );

    expect(navigate).toHaveBeenCalled();
    expect(container.querySelector('#userInfo')).toBeInTheDocument();
    expect(container.querySelector('#form')).toBeInTheDocument();
  });
});
