/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
  test('renders button with correct content', () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonElement = getByText('Hello');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick function when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button onClick={onClickMock}>Click me</Button>);
    const buttonElement = getByText('Click me');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('has the correct button type', () => {
    const { container } = render(<Button type='submit'>Submit</Button>);
    const buttonElement = container.querySelector('#btn');
    console.log(buttonElement);
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });
});
