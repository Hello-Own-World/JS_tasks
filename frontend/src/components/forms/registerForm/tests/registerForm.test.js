/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../registerForm';

describe('RegisterForm component', () => {
  it('renders register form with empty fields', () => {
    const { getByLabelText } = render(<RegisterForm setError={jest.fn()} />);
    expect(getByLabelText('Login:')).toHaveValue('');
    expect(getByLabelText('Password:')).toHaveValue('');
    expect(getByLabelText('First Name:')).toHaveValue('');
    expect(getByLabelText('Last Name:')).toHaveValue('');
    expect(getByLabelText('Phone Number:')).toHaveValue('');
  });

  it('displays error message for empty fields on submit', () => {
    const setError = jest.fn();
    const { getByLabelText, getByText } = render(<RegisterForm setError={setError} />);

    fireEvent.submit(getByText('Register'));

    expect(setError).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledWith({
      title: 'Invalid input',
      message: 'Please enter all data',
    });
  });

  it('submits register form with valid input', async () => {
    const setError = jest.fn();
    const { getByLabelText, getByText } = render(<RegisterForm setError={setError} />);

    const loginInput = getByLabelText('Login:');
    const passwordInput = getByLabelText('Password:');
    const firstNameInput = getByLabelText('First Name:');
    const lastNameInput = getByLabelText('Last Name:');
    const phoneInput = getByLabelText('Phone Number:');
    const registerButton = getByText('Register');

    fireEvent.change(loginInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.submit(registerButton);

    await waitFor(() => {
      expect(setError).toHaveBeenCalledTimes(0);
      // Add assertions for successful registration, e.g., check if API call was made
    });
  });
});
