import { useQuery } from "@tanstack/react-query";
import { getPhotoDetail, getPhotoStats } from "../services/imagesApi";

export function usePhotoData(id: string | null) {
  const detail = useQuery({
    queryKey: ["photo", id],
    queryFn: () => getPhotoDetail(id as string),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const stats = useQuery({
    queryKey: ["photo-stats", id],
    queryFn: () => getPhotoStats(id as string),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    detail: detail.data,
    stats: stats.data,
    isLoading: detail.isLoading || stats.isLoading,
    isError: detail.isError || stats.isError,
  };
}
