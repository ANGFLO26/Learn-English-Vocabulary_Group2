import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import VocabularyCard from '../../components/VocabularyCard';

// Mock speech utils
vi.mock('../../utils/speechUtils', () => ({
  speakText: vi.fn()
}));

describe('VocabularyCard Component', () => {
  const mockWord = {
    word: 'Hello',
    meaning: 'Used as a greeting',
    phonetic: 'həˈləʊ'
  };

  test('renders word correctly', () => {
    render(<VocabularyCard word={mockWord} />);
    expect(screen.getByText(mockWord.word)).toBeInTheDocument();
  });

  test('displays meaning', () => {
    render(<VocabularyCard word={mockWord} />);
    expect(screen.getByText(mockWord.meaning)).toBeInTheDocument();
  });

  test('displays phonetic', () => {
    render(<VocabularyCard word={mockWord} />);
    expect(screen.getByText(mockWord.phonetic)).toBeInTheDocument();
  });

  test('shows speaker button', () => {
    render(<VocabularyCard word={mockWord} />);
    const speakerButton = screen.getByRole('button');
    expect(speakerButton).toBeInTheDocument();
  });
}); 