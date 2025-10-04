import { useEffect } from "react";
import { usePhotoData } from "../hooks/usePhotoData";
import Stat from "./Stat";

function n(num?: number) {
  return new Intl.NumberFormat().format(num ?? 0);
}

export default function PhotoModal({
  photoId,
  onClose,
}: {
  photoId: string;
  onClose: () => void;
}) {
  const { detail, stats, isLoading, isError } = usePhotoData(photoId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl w-[95%] bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-sm text-gray-600">
            {detail?.user?.name ? (
              <a
                className="underline"
                href={`${detail.user.links.html}?utm_source=${
                  import.meta.env.VITE_APP_NAME
                }&utm_medium=referral`}
                target="_blank"
                rel="noreferrer"
              >
                Photo by {detail.user.name}
              </a>
            ) : (
              <span>Photo</span>
            )}
            {" · "}
            <a
              className="underline"
              href={`${detail?.links?.html}?utm_source=${
                import.meta.env.VITE_APP_NAME
              }&utm_medium=referral`}
              target="_blank"
              rel="noreferrer"
            >
              Unsplash
            </a>
          </div>

          <button
            onClick={onClose}
            className="rounded-full w-8 h-8 grid place-items-center border hover:bg-gray-50"
            aria-label="Close"
          >
            ✖
          </button>
        </div>

        <div className="p-4 grid gap-4 md:grid-cols-5">
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="w-full h-[60vh] bg-gray-200 animate-pulse rounded-xl" />
            ) : isError ? (
              <div className="text-sm text-red-500">Failed to load image.</div>
            ) : (
              <img
                src={
                  detail?.urls?.regular ||
                  detail?.urls?.full ||
                  detail?.urls?.small
                }
                alt={detail?.alt_description || "Unsplash"}
                className="w-full max-h-[70vh] object-contain rounded-xl"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Views" value={n(stats?.views?.total)} />
              <Stat label="Downloads" value={n(stats?.downloads?.total)} />
              <Stat
                label="Likes"
                value={n(detail?.likes ?? stats?.likes?.total)}
              />
            </div>

            {detail?.description || detail?.alt_description ? (
              <p className="mt-4 text-sm text-gray-600">
                {detail.description || detail.alt_description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
