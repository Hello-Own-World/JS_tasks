/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../register';

describe('Register component', () => {
  test('renders the registration form', () => {
    const { container } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const registerForm = container.querySelector('#form');
    expect(registerForm).toBeInTheDocument();
  });

  test('displays the login link', () => {
    const { container } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const loginLink = container.querySelector('#loginLink');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute('href')).toBe('/login');
  });
});
