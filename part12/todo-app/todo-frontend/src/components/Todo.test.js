import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';
import React from 'react';

test('renders Todo component without errors', () => {
    render(<Todo />);
    
});

test('h1 has correct style', () => {
    render(<Todo />);
    const headerElement = screen.getByText('Todos');
    expect(headerElement).toHaveStyle('font-size: 2em');
  });