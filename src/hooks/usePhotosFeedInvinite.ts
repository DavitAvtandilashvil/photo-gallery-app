import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularPhotosPage, searchPhotosPage } from "../services/imagesApi";

const PER_PAGE = 20;

export function usePhotosFeedInfinite(query: string) {
  const trimmed = query.trim();

  return useInfiniteQuery({
    queryKey: ["photos-feed", trimmed],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      if (!trimmed) {
        const data = await getPopularPhotosPage(pageParam, PER_PAGE);

        return { mode: "popular" as const, items: data, totalPages: undefined };
      } else {
        const data = await searchPhotosPage(trimmed, pageParam, PER_PAGE);
        return {
          mode: "search" as const,
          items: data.results,
          totalPages: data.total_pages,
        };
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.mode === "popular") {
        return lastPage.items.length === PER_PAGE
          ? allPages.length + 1
          : undefined;
      }

      const currentPage = allPages.length;
      return currentPage < (lastPage.totalPages ?? 0)
        ? currentPage + 1
        : undefined;
    },

    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
