import React from 'react';
import 'react-native';

import { render } from '@testing-library/react-native';

import App from '../App';

describe('App', () => {
  it('renders correctly', () => {
    const app = render(<App />);
    expect(app).toBeTruthy();
  });

  it('elements should be accessible', () => {
    const { getByText } = render(<App />);
    const text = getByText('Log In');
    expect(text).toBeAccessible();
  });
});
