/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from '../../../core/contexts/userContext';
import AuthApi from '../../../core/logic/authApi';
import Header from '../header';

describe('Header', () => {
  beforeEach(() => {
    jest.spyOn(AuthApi, 'getPrevLogin').mockReturnValue('testuser');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the header with username', async () => {
    render(
      <Router>
        <UserContext.Provider value={{ username: 'testuser', setUsername: jest.fn() }}>
          <Header />
        </UserContext.Provider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/testuser/)).toBeInTheDocument();
    });
  });

  it('renders the header without username', async () => {
    render(
      <Router>
        <UserContext.Provider value={{ username: '', setUsername: jest.fn() }}>
          <Header />
        </UserContext.Provider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText(/testuser/)).toBeNull();
    });
  });
});
