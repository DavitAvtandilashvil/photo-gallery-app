import { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import SkeletonGrid from "../components/SkeletonGrid";
import { usePhotosFeedInfinite } from "../hooks/usePhotosFeedInvinite";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useSearchHistory } from "../store/useSearchHistory";

export default function Home() {
  const [query, setQuery] = useState("");
  const dq = useDebouncedValue(query, 600);

  const addHistory = useSearchHistory((s) => s.add);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = usePhotosFeedInfinite(dq);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const photos = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const node = loadMoreRef.current;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "400px 0px" }
    );

    io.observe(node);
    return () => io.unobserve(node);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, dq]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dq]);

  useEffect(() => {
    if (dq.trim()) addHistory(dq);
  }, [dq, addHistory]);

  return (
    <div>
      <Wrapper>
        <div className="mt-[20px]">
          <h1 className="text-[24px] font-semibold pb-[10px] border-b-[1px] border-b-[#e1e7ef] w-[200px]">
            მთავარი
          </h1>

          <div className="mt-[10px] relative">
            <input
              type="text"
              placeholder="ძებნა"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-[14px] p-3 h-[30px] w-[300px] border-[1px] border-[#e1e7ef] rounded-[10px] pr-8"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                aria-label="Clear search"
              >
                ✖
              </button>
            )}
          </div>

          {status === "pending" ? (
            <SkeletonGrid count={12} />
          ) : (
            <div
              key={dq || "popular"}
              className="mt-[20px] grid gap-4"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              }}
            >
              {photos.map((p) => (
                <img
                  key={p.id}
                  src={p.urls.small}
                  alt={p.alt_description || "Unsplash"}
                  className="w-full h-[200px] object-cover rounded-[10px] border
                             transition duration-300 ease-in-out
                             hover:scale-105 hover:shadow-lg hover:brightness-110 cursor-pointer"
                />
              ))}
            </div>
          )}

          <div ref={loadMoreRef} className="h-[1px]" />

          {isFetchingNextPage && <SkeletonGrid count={6} />}

          <div className="py-4 text-sm text-gray-500">
            {isFetching && status !== "pending" && "Refreshing…"}
            {!hasNextPage && photos.length > 0 && "You’re all caught up"}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
