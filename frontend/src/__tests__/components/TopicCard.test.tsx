import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TopicCard from '../../components/TopicCard';

// Mock the context
vi.mock('../../context/ProgressContext', () => ({
  useProgress: () => ({
    isTopicCompleted: vi.fn(() => false)
  })
}));

const MockedTopicCard = ({ topic }: any) => (
  <BrowserRouter>
    <TopicCard topic={topic} />
  </BrowserRouter>
);

describe('TopicCard Component', () => {
  const mockTopic = {
    id: 1,
    name_topic: 'Basic Greetings',
    description: 'Learn common greeting words and phrases'
  };

  test('renders topic name correctly', () => {
    render(<MockedTopicCard topic={mockTopic} />);
    expect(screen.getByText(mockTopic.name_topic)).toBeInTheDocument();
  });

  test('displays topic description', () => {
    render(<MockedTopicCard topic={mockTopic} />);
    expect(screen.getByText(mockTopic.description)).toBeInTheDocument();
  });

  test('shows learn and test buttons', () => {
    render(<MockedTopicCard topic={mockTopic} />);
    expect(screen.getByText('Học')).toBeInTheDocument();
    expect(screen.getByText('Kiểm tra')).toBeInTheDocument();
  });
}); 