/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../homePage';

describe('Home component', () => {
  test('renders the about section', () => {
    const { container } = render(<Home />);

    const aboutSection = container.querySelector('#aboutSection');
    expect(aboutSection).toBeInTheDocument();

    const heading = container.querySelector('#heading');
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(
      'Chat App is a modern and easy-to-use chat application that allows you to connect with people around the world. With Chat App, you can easily chat with your friends, family, or colleagues, share files, and stay connected wherever you are.'
    );
    expect(paragraph).toBeInTheDocument();
  });
});
