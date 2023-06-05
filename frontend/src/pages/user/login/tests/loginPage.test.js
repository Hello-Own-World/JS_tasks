/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Login from '../login';

describe('Login component', () => {
  test('renders the login form', () => {
    const { container } = render(<Login />, { wrapper: MemoryRouter });
    // render(<Login />, { wrapper: MemoryRouter });

    const heading = container.querySelector('#heading');
    expect(heading).toBeInTheDocument();

    const loginForm = container.querySelector('#form');
    expect(loginForm).toBeInTheDocument();

    const signUpLink = container.querySelector('#link');
    expect(signUpLink).toHaveAttribute('href', '/register');
  });
  
});
