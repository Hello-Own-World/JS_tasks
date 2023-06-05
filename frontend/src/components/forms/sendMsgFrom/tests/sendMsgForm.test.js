/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SendMsgForm from '../sendMsgForm';

describe('SendMsgForm component', () => {
  it('renders the form correctly', () => {
    const { getByText, getByRole } = render(<SendMsgForm />);

    // Check if the form elements are rendered correctly
    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByText('Send')).toBeInTheDocument();
  });

  it('submits the message correctly', () => {
    const mockSendMsg = jest.fn();
    const { getByRole } = render(<SendMsgForm />);
    const inputElement = getByRole('textbox');

    // Simulate user input
    fireEvent.change(inputElement, { target: { value: 'Hello, world!' } });

    // Simulate form submission
    fireEvent.submit(inputElement.closest('form'));

    // Check if the message is submitted correctly
    expect(mockSendMsg).toHaveBeenCalledWith({ body: 'Hello, world!' });
    expect(inputElement.value).toBe('');
  });

  it('does not submit an empty message', () => {
    const mockSendMsg = jest.fn();
    const { getByRole } = render(<SendMsgForm />);
    const inputElement = getByRole('textbox');

    // Simulate form submission with an empty message
    fireEvent.submit(inputElement.closest('form'));

    // Check if the empty message is not submitted
    expect(mockSendMsg).not.toHaveBeenCalled();
    expect(inputElement.value).toBe('');
  });
});
