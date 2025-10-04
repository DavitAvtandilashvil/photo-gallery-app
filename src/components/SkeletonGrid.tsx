import SkeletonCard from "./SkeletonCard";

export default function SkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div
      className="mt-[20px] grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
