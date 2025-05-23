import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useQuiz } from '../../hooks/useQuiz';

describe('useQuiz Hook', () => {
  test('initializes with default state', () => {
    const { result } = renderHook(() => useQuiz());

    expect(result.current.currentQuestion).toBe(0);
    expect(result.current.score).toBe(0);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.questions).toEqual([]);
  });

  test('moves to next question', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.loadQuestions([
        { id: 1, question: 'Test 1', option1: 'A', option2: 'B', option3: 'C', correct_answer: 'A' },
        { id: 2, question: 'Test 2', option1: 'D', option2: 'E', option3: 'F', correct_answer: 'D' }
      ]);
    });

    expect(result.current.currentQuestion).toBe(0);

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentQuestion).toBe(1);
  });

  test('submits correct answer and updates score', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.loadQuestions([
        { id: 1, question: 'Test', option1: 'A', option2: 'B', option3: 'C', correct_answer: 'A' }
      ]);
    });

    act(() => {
      result.current.submitAnswer('A');
    });

    expect(result.current.score).toBe(1);
  });

  test('completes quiz when reaching last question', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.loadQuestions([
        { id: 1, question: 'Test', option1: 'A', option2: 'B', option3: 'C', correct_answer: 'A' }
      ]);
    });

    act(() => {
      result.current.submitAnswer('A');
      result.current.nextQuestion();
    });

    expect(result.current.isCompleted).toBe(true);
  });
}); 