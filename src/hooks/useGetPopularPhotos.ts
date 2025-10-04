import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularPhotosPage } from "../services/imagesApi";

const PER_PAGE = 20;

export function usePopularPhotosInfinite() {
  return useInfiniteQuery({
    queryKey: ["popular-photos", "infinite"],
    queryFn: ({ pageParam = 1 }) => getPopularPhotosPage(pageParam, PER_PAGE),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === PER_PAGE ? allPages.length + 1 : undefined;
    },

    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
