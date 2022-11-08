import { render, screen } from '@testing-library/react';
import App from './App';
global.crypto = require('crypto');

test('renders learn react link', () => {

  render(<App />);
  const linkElement = screen.getByText(/Koľko stojí auto?/i);
  expect(linkElement).toBeInTheDocument();
});
