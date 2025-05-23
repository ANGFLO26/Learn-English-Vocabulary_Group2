import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage.tsx';

// Mock the router
const MockedHomePage = () => (
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);

describe('HomePage', () => {
  test('renders welcome message', () => {
    render(<MockedHomePage />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  test('displays topic selection', () => {
    render(<MockedHomePage />);
    expect(screen.getByText(/choose a topic/i)).toBeInTheDocument();
  });

  test('shows navigation buttons', () => {
    render(<MockedHomePage />);
    expect(screen.getByRole('button', { name: /start learning/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /take quiz/i })).toBeInTheDocument();
  });

  test('displays user progress', () => {
    render(<MockedHomePage />);
    expect(screen.getByText(/your progress/i)).toBeInTheDocument();
  });
}); 