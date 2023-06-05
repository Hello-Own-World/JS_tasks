/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import WarningMsg from '../warningMsg';
import '@testing-library/jest-dom';

describe('WarningMsg component', () => {
  test('renders warning message with correct content', () => {
    const { getByText } = render(<WarningMsg />);
    const errorMsgElement = getByText('Error!');
    const linkElement = getByText('Log in page');

    expect(errorMsgElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  test('has the correct CSS class for the warning message', () => {
    const { container } = render(<WarningMsg />);
    const alertElement = container.querySelector('.alert');
    const alertWarningElement = container.querySelector('.alert-warning');

    expect(alertElement).toBeInTheDocument();
    expect(alertWarningElement).toBeInTheDocument();
  });

  test('has the correct link URL', () => {
    const { getByText } = render(<WarningMsg />);
    const linkElement = getByText('Log in page');

    expect(linkElement).toHaveAttribute('href', '/login');
  });
});
