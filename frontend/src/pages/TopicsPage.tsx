import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../api/topicsApi";
import TopicCard from "../components/TopicCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgress } from "../context/ProgressContext";

const TopicsPage = () => {
  const { data: topics, isLoading, error, isError } = useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  });
  const { fetchMultiTopicProgress } = useProgress();

  useEffect(() => {
    if (isError) {
      console.error("Error fetching topics:", error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (topics && topics.length > 0) {
      fetchMultiTopicProgress(topics.map(t => t.id));
    }
  }, [topics, fetchMultiTopicProgress]);

  return (
    <div className="page-transition">
      <h1 className="text-3xl font-bold mb-2">Chủ đề từ vựng</h1>
      <p className="text-gray-500 mb-8">Chọn một chủ đề để bắt đầu học và kiểm tra</p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center p-8">
          <p className="text-red-500">Có lỗi xảy ra khi tải chủ đề: {error?.message || "Vui lòng thử lại sau."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics?.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicsPage;
