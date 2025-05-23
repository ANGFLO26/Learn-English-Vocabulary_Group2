// API Service cho testing
export interface Topic {
  id: number;
  name_topic: string;
  description: string;
}

export interface Vocabulary {
  id: number;
  word: string;
  definition: string;
  example?: string;
  pronunciation?: string;
}

export interface QuizResults {
  userId: number;
  score: number;
  timeSpent: number;
}

export const fetchTopics = async (): Promise<Topic[]> => {
  const response = await fetch('/api/topics');
  if (!response.ok) {
    throw new Error('Failed to fetch topics');
  }
  return response.json();
};

export const fetchVocabulary = async (topicId: number): Promise<Vocabulary[]> => {
  const response = await fetch(`/api/vocabulary/topic/${topicId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch vocabulary');
  }
  return response.json();
};

export const submitQuizResults = async (results: QuizResults) => {
  const response = await fetch('/api/quiz/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(results),
  });
  if (!response.ok) {
    throw new Error('Failed to submit quiz results');
  }
  return response.json();
}; 