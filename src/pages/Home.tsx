import { useEffect, useMemo, useRef } from "react";
import Wrapper from "../components/Wrapper";
import { usePopularPhotosInfinite } from "../hooks/useGetPopularPhotos";
import SkeletonGrid from "../components/SkeletonGrid";

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePopularPhotosInfinite();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const photos = useMemo(() => data?.pages.flat() ?? [], [data]);

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      <Wrapper>
        <div className="mt-[20px]">
          <h1 className="text-[24px] font-semibold pb-[10px] border-b-[1px] border-b-[#e1e7ef] w-[200px]">
            მთავარი
          </h1>

          <div className="mt-[10px]">
            <input
              type="text"
              placeholder="ძებნა"
              className="text-[14px] p-3 h-[30px] w-[300px] border-[1px] border-[#e1e7ef] rounded-[10px]"
              disabled // search comes later
            />
          </div>

          {/* Grid */}
          <div
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

          {/* Loader / sentinel */}
          <div ref={loadMoreRef} className="h-[1px]" />
          <div className="py-4 text-sm text-gray-500">
            {status === "pending" && "Loading…" && <SkeletonGrid count={12} />}
            {isFetchingNextPage && <SkeletonGrid count={12} />}
            {!hasNextPage && photos.length > 0 && "You’re all caught up ✨"}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
