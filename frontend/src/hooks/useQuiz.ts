import { useState } from 'react';

export interface QuizQuestion {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  correct_answer: string;
}

export const useQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const loadQuestions = (newQuestions: QuizQuestion[]) => {
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setIsCompleted(false);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setIsCompleted(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const submitAnswer = (answer: string) => {
    if (questions[currentQuestion]?.correct_answer === answer) {
      setScore(prev => prev + 1);
    }
  };

  return {
    currentQuestion,
    score,
    isCompleted,
    questions,
    loadQuestions,
    nextQuestion,
    submitAnswer
  };
}; 