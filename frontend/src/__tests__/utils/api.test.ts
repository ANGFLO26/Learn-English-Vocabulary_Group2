import { describe, test, expect, beforeEach, vi } from 'vitest';
import { fetchTopics, fetchVocabulary, submitQuizResults } from '../../api/apiService';

// Mock fetch
global.fetch = vi.fn();

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchTopics', () => {
    test('fetches topics successfully', async () => {
      const mockTopics = [
        { id: 1, name_topic: 'Basic Greetings', description: 'Learn greetings' },
        { id: 2, name_topic: 'Common Phrases', description: 'Learn phrases' }
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTopics,
      });

      const result = await fetchTopics();
      expect(result).toEqual(mockTopics);
      expect(fetch).toHaveBeenCalledWith('/api/topics');
    });

    test('handles fetch error', async () => {
      (fetch as any).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(fetchTopics()).rejects.toThrow('Network error');
    });
  });

  describe('fetchVocabulary', () => {
    test('fetches vocabulary for a topic', async () => {
      const mockVocabulary = [
        { id: 1, word: 'Hello', definition: 'A greeting' },
        { id: 2, word: 'Goodbye', definition: 'A farewell' }
      ];

      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockVocabulary,
      });

      const result = await fetchVocabulary(1);
      expect(result).toEqual(mockVocabulary);
      expect(fetch).toHaveBeenCalledWith('/api/vocabulary/topic/1');
    });
  });

  describe('submitQuizResults', () => {
    test('submits quiz results successfully', async () => {
      const mockResults = { userId: 1, score: 85, timeSpent: 300 };
      
      (fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const result = await submitQuizResults(mockResults);
      expect(result).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledWith('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockResults)
      });
    });
  });
}); 