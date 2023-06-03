/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Message from '../../src/components/common/message';
import '@testing-library/jest-dom';

describe('Message component', () => {
  const props = {
    id: 1,
    username: 'John',
    message: 'Hello World',
    time: '10:00 AM',
  };

  test('renders message box with correct content', () => {
    const { getByText } = render(<Message {...props} />);
    const usernameElement = getByText(props.username);
    const messageElement = getByText(props.message);
    const timeElement = getByText(props.time);

    expect(usernameElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
  });

  test('has the correct CSS class for message box', () => {
    const { container } = render(<Message {...props} />);
    const messageBoxElement = container.querySelector('.messageBox');

    expect(messageBoxElement).toBeInTheDocument();
  });
});
