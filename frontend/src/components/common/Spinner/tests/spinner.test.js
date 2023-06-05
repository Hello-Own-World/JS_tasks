/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../spinner';
import '@testing-library/jest-dom';

describe('Spinner component', () => {
  test('renders spinner when loading is true', () => {
    const { container } = render(<Spinner loading={true} />);
    const spinnerElement = container.querySelector('#spinner');

    expect(spinnerElement).toBeInTheDocument();
  });

  test('does not render spinner when loading is false', () => {
    const { container } = render(<Spinner loading={false} />);
    const spinnerElement = container.querySelector('.spinner');

    expect(spinnerElement).not.toBeInTheDocument();
  });
});
