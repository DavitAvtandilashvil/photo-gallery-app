import { useEffect, useMemo, useRef, useState } from "react";
import Wrapper from "../components/Wrapper";
import SkeletonGrid from "../components/SkeletonGrid";

import { useSearchHistory } from "../store/useSearchHistory";
import { usePhotosFeedInfinite } from "../hooks/usePhotosFeedInvinite";
import { timeAgo } from "../utils/timeAgo";
import PhotoModal from "../components/PhotoModal";

export default function History() {
  const { items, clear, remove } = useSearchHistory();
  const [selected, setSelected] = useState<string>(items[0]?.query ?? "");

  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!items.length) setSelected("");
    else if (!items.find((i) => i.query === selected))
      setSelected(items[0].query);
  }, [items, selected]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePhotosFeedInfinite(selected);

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
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "400px 0px" }
    );

    io.observe(node);
    return () => io.unobserve(node);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, selected]);

  useEffect(() => {
    if (selected) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selected]);

  return (
    <div>
      <Wrapper>
        <div className="mt-[20px]">
          <h1 className="text-[24px] font-semibold pb-[10px] border-b-[1px] border-b-[#e1e7ef] w-[200px]">
            ისტორია
          </h1>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
            <aside className="md:col-span-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[16px] font-medium">ძებნები</h2>
                {items.length > 0 && (
                  <button
                    onClick={clear}
                    className="text-[12px] underline text-gray-500 hover:text-black"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-gray-500">
                  ჯერ არ გაქვს ძებნის ისტორია. სცადე მოძებნა მთავარ გვერდზე.
                </p>
              ) : (
                <ul className="space-y-2 max-h-[70vh] overflow-auto pr-1">
                  {items.map((it) => {
                    const active = it.query === selected;
                    return (
                      <li
                        key={it.id}
                        className={`flex items-center justify-between rounded-[10px] border p-2 cursor-pointer ${
                          active
                            ? "bg-gray-100 border-gray-300"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelected(it.query)}
                        title={it.query}
                      >
                        <div className="min-w-0">
                          <p className="text-[14px] truncate">{it.query}</p>
                          <p className="text-[12px] text-gray-500">
                            {timeAgo(it.at)}
                          </p>
                        </div>
                        <button
                          className="text-gray-400 hover:text-red-500 text-sm ml-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(it.id);
                          }}
                          aria-label="Remove"
                        >
                          ✖
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </aside>

            <section className="md:col-span-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[16px] font-medium">
                  {selected && `Results for “${selected}”`}
                </h2>
              </div>

              {selected && (
                <>
                  {status === "pending" ? (
                    <SkeletonGrid count={12} />
                  ) : (
                    <div
                      key={selected}
                      className="mt-[10px] grid gap-4"
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(250px, 1fr))",
                      }}
                    >
                      {photos.map((p) => (
                        <img
                          key={p.id}
                          src={p.urls.small}
                          alt={p.alt_description || "Unsplash"}
                          onClick={() => setOpenId(p.id)}
                          className="w-full h-[200px] object-cover rounded-[10px] border
                                     transition duration-300 ease-in-out
                                     hover:scale-105 hover:shadow-lg hover:brightness-110 cursor-pointer"
                        />
                      ))}
                    </div>
                  )}

                  <div ref={loadMoreRef} className="h-[1px]" />
                  {isFetchingNextPage && <SkeletonGrid count={6} />}
                </>
              )}
            </section>
          </div>
        </div>
      </Wrapper>
      {openId && (
        <PhotoModal photoId={openId} onClose={() => setOpenId(null)} />
      )}
    </div>
  );
}
