import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders snooker club dashboard', () => {
  render(<App />);
  const headingElement = screen.getByText(/snooker club dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
