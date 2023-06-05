/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import UserCard from '../userCard';
import '@testing-library/jest-dom';

describe('UserCard component', () => {
  const props = {
    id: 1,
    username: 'John',
    status: 'Online',
  };

  test('renders user card with correct username', () => {
    const { getByText } = render(<UserCard {...props} />);
    const usernameElement = getByText(props.username);

    expect(usernameElement).toBeInTheDocument();
  });

  test('does not display status badge when status is neither Online nor Away', () => {
    const { container } = render(<UserCard {...props} status='Offline' />);
    const badgeElement = container.querySelector('.badge');

    expect(badgeElement).not.toBeInTheDocument();
  });
});
