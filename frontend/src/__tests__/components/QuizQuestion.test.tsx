import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import QuizQuestion from '../../components/QuizQuestion';

describe('QuizQuestion Component', () => {
  const mockQuestion = {
    question: 'What is the meaning of "Hello"?',
    option1: 'Xin chào',
    option2: 'Tạm biệt', 
    option3: 'Cảm ơn',
    correct_answer: 'Xin chào'
  };

  const mockOnAnswer = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders question text correctly', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
  });

  test('displays all answer options', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
    expect(screen.getByText(mockQuestion.option1)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.option2)).toBeInTheDocument();
    expect(screen.getByText(mockQuestion.option3)).toBeInTheDocument();
  });

  test('handles correct answer selection', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
    
    // Chọn đáp án đúng
    const correctOption = screen.getByLabelText(mockQuestion.correct_answer);
    fireEvent.click(correctOption);
    
    // Click button submit
    const submitButton = screen.getByRole('button', { name: /kiểm tra/i });
    fireEvent.click(submitButton);
    
    expect(mockOnAnswer).toHaveBeenCalledWith(true);
  });

  test('handles incorrect answer selection', () => {
    render(<QuizQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
    
    // Chọn đáp án sai
    const incorrectOption = screen.getByLabelText('Tạm biệt');
    fireEvent.click(incorrectOption);
    
    // Click button submit
    const submitButton = screen.getByRole('button', { name: /kiểm tra/i });
    fireEvent.click(submitButton);
    
    expect(mockOnAnswer).toHaveBeenCalledWith(false);
  });
}); 