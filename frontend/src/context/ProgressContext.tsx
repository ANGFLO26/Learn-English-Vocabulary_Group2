import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";
import { checkTopicPassed, checkMultiTopicPassed } from "../api/topicsApi";

interface TopicProgress {
  topicId: string | number;
  completed: boolean;
  score: number;
}

interface ProgressContextType {
  topicProgress: Record<string, TopicProgress>;
  fetchTopicProgress: (topicId: string | number) => Promise<void>;
  fetchMultiTopicProgress: (topicIds: (string | number)[]) => Promise<void>;
  getTopicProgress: (topicId: string | number) => TopicProgress | undefined;
  isTopicCompleted: (topicId: string | number) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>({});
  const prevTopicIds = useRef<string[]>([]);

  // Reset progress when user changes
  useEffect(() => {
    setTopicProgress({});
    prevTopicIds.current = [];
  }, [user]);

  // Memoized function to fetch single topic progress
  const fetchTopicProgress = useCallback(async (topicId: string | number) => {
    if (!user) return;
    const topicKey = topicId.toString();
    try {
      const completed = await checkTopicPassed(topicKey);
      setTopicProgress(prev => ({
        ...prev,
        [topicKey]: { topicId, completed, score: completed ? 100 : 0 }
      }));
    } catch (e) {
      console.error(`Error fetching progress for topic ${topicId}:`, e);
    }
  }, [user]);

  // Memoized function to fetch multiple topics progress
  const fetchMultiTopicProgress = useCallback(async (topicIds: (string | number)[]) => {
    if (!user || topicIds.length === 0) return;
    
    // Convert all IDs to strings for comparison
    const ids = topicIds.map(id => id.toString());
    
    // Check if the IDs have actually changed
    if (JSON.stringify(ids) === JSON.stringify(prevTopicIds.current)) {
      return; // Skip if IDs haven't changed
    }
    
    try {
      const results = await checkMultiTopicPassed(ids);
      setTopicProgress(prev => {
        const updated = { ...prev };
        ids.forEach(id => {
          updated[id] = { 
            topicId: id, 
            completed: !!results[id], 
            score: results[id] ? 100 : 0 
          };
        });
        return updated;
      });
      // Update the previous IDs reference
      prevTopicIds.current = ids;
    } catch (e) {
      console.error('Error fetching multi-topic progress:', e);
    }
  }, [user]);

  // Memoized function to get topic progress
  const getTopicProgress = useCallback((topicId: string | number): TopicProgress | undefined => {
    const topicKey = topicId.toString();
    return topicProgress[topicKey];
  }, [topicProgress]);

  // Memoized function to check if topic is completed
  const isTopicCompleted = useCallback((topicId: string | number): boolean => {
    const topicKey = topicId.toString();
    return !!topicProgress[topicKey]?.completed;
  }, [topicProgress]);

  return (
    <ProgressContext.Provider
      value={{ 
        topicProgress, 
        fetchTopicProgress, 
        fetchMultiTopicProgress, 
        getTopicProgress, 
        isTopicCompleted 
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
