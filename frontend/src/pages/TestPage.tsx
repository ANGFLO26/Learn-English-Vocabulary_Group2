import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTopic, getTopicQuizQuestions, submitQuizResults } from "../api/topicsApi";
import { useProgress } from "../context/ProgressContext";
import QuizQuestion from "../components/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const TestPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { fetchTopicProgress } = useProgress();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ test_id: number, score: number }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Fetch topic data with caching
  const { data: topic, isLoading: topicLoading, isError: topicError, error: topicErrorObj } = useQuery({
    queryKey: ["topic", topicId],
    queryFn: () => getTopic(topicId || ""),
    enabled: !!topicId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  // Fetch quiz questions with caching
  const { 
    data: questions,
    isLoading: questionsLoading,
    isError: questionsError,
    error: questionsErrorObj
  } = useQuery({
    queryKey: ["quiz", topicId],
    queryFn: () => getTopicQuizQuestions(topicId || ""),
    enabled: !!topicId && !hasSubmitted, // Don't fetch if test is completed
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  const isLoading = topicLoading || questionsLoading;
  const isError = topicError || questionsError;
  const errorMsg = topicErrorObj?.message || questionsErrorObj?.message;
  const totalQuestions = questions?.length || 0;
  const progress = (answeredQuestions.length / totalQuestions) * 100;
  const hasNextQuestion = currentQuestionIndex < totalQuestions - 1;
  
  // Reset test state when topic changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions([]);
    setTestCompleted(false);
    setUserAnswers([]);
    setIsSubmitting(false);
    setHasSubmitted(false);
  }, [topicId]);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (questions && questions.length > 0) {
      const currentTestId = questions[currentQuestionIndex].id;
      if (typeof currentTestId !== 'number') {
        toast({
          title: "Lỗi dữ liệu",
          description: `Không tìm thấy id cho câu hỏi thứ ${currentQuestionIndex + 1}`,
          variant: "destructive"
        });
        console.error("Lỗi: currentTestId undefined", questions[currentQuestionIndex]);
        return;
      }
      const newAnswers = [
        ...userAnswers,
        { test_id: currentTestId, score: isCorrect ? 1 : 0 }
      ];
      setUserAnswers(newAnswers);
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
      setTimeout(() => {
        if (hasNextQuestion) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          completeTest();
        }
      }, 1500);
    }
  }, [questions, currentQuestionIndex, userAnswers, hasNextQuestion, toast]);

  const completeTest = useCallback(async () => {
    if (!topicId || isSubmitting || hasSubmitted) return;
    
    setIsSubmitting(true);
    const correctCount = userAnswers.filter(ans => ans.score === 1).length;
    const totalQuestions = userAnswers.length;
    const finalScore = (correctCount / totalQuestions) * 100;
    const passed = finalScore >= 80;

    try {
      // Submit test results
      await submitQuizResults({ topic_id: Number(topicId), score: finalScore });
      
      // Only fetch progress if the test was passed
      if (passed) {
        await fetchTopicProgress(topicId);
        // Invalidate topics query to refresh the list
        queryClient.invalidateQueries({ queryKey: ["topics"] });
      }
      
      setTestCompleted(true);
      setHasSubmitted(true);
      
      toast({
        title: passed ? "Chúc mừng!" : "Chưa đạt yêu cầu",
        description: passed 
          ? `Bạn đã hoàn thành bài kiểm tra với điểm số ${Math.round(finalScore)}%` 
          : `Bạn cần đạt ít nhất 80% để vượt qua bài kiểm tra`,
        variant: passed ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Lỗi khi lưu kết quả kiểm tra:", error);
      toast({
        title: "Lỗi lưu kết quả",
        description: "Không thể lưu kết quả bài kiểm tra. Vui lòng thử lại sau.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [topicId, userAnswers, fetchTopicProgress, toast, isSubmitting, hasSubmitted, queryClient]);

  const restartTest = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions([]);
    setTestCompleted(false);
    setUserAnswers([]);
    setIsSubmitting(false);
    setHasSubmitted(false);
  }, []);

  return (
    <div className="page-transition">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild disabled={isLoading || isSubmitting}>
            <Link to="/topics">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>

          {isLoading ? (
            <Skeleton className="h-6 w-48" />
          ) : (
            <h1 className="text-2xl font-bold">{topic?.name_topic} - Kiểm tra</h1>
          )}
        </div>

        {!testCompleted && !isLoading && (
          <div className="text-sm text-gray-500">
            Câu {currentQuestionIndex + 1}/{totalQuestions}
          </div>
        )}
      </div>

      {isError && (
        <div className="text-red-500 text-center mb-4">
          Đã có lỗi xảy ra khi tải dữ liệu: {errorMsg || "Vui lòng thử lại sau."}
        </div>
      )}

      {!testCompleted ? (
        <>
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-4 w-full" />
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Progress value={progress} className="h-2" />
              </div>
              
              {questions && questions.length > 0 && (
                <QuizQuestion
                  question={questions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  disabled={isSubmitting}
                />
              )}
            </>
          )}
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Kết quả bài kiểm tra</h2>
          
          <div className="text-5xl font-bold mb-4 text-primary">
            {Math.round((score / totalQuestions) * 100)}%
          </div>
          
          <p className="mb-6 text-gray-600">
            Bạn đã đúng {score}/{totalQuestions} câu hỏi
          </p>
          
          <div className={`p-3 mb-8 rounded-md ${
            score / totalQuestions >= 0.88
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {score / totalQuestions >= 0.8
              ? "Chúc mừng! Bạn đã hoàn thành chủ đề này."
              : "Bạn cần đạt ít nhất 80% để vượt qua bài kiểm tra."}
          </div>
          
          <div className="flex gap-4 flex-col sm:flex-row justify-center">
            <Button
              variant="outline"
              onClick={restartTest}
              className="flex items-center"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Làm lại bài kiểm tra
            </Button>
            
            <Button
              onClick={() => navigate(`/learn/${topicId}`)}
              variant={score / totalQuestions >= 0.8 ? "outline" : "default"}
            >
              Quay lại học
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
