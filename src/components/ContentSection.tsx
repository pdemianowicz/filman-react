import { useRef } from "react";
import MediaCard from "./MediaCard";

interface ContentSectionProps {
  title: string;
  items: any[];
}

export default function ContentSection({ title, items }: ContentSectionProps) {
  if (!items || items.length === 0) return null;

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.9;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="w-10 h-10 flex items-center justify-center rounded hover:bg-surface text-white/70">
            ◀
          </button>
          <button onClick={() => scroll("right")} className="w-10 h-10 flex items-center justify-center rounded hover:bg-surface text-white/70">
            ▶
          </button>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-4 scroll-smooth overflow-x-hidden snap-x snap-mandatory">
        {items.map((item) => (
          <div key={`${item.media_type}-${item.id}`} className="snap-start">
            <MediaCard item={item} size="normal" showInfo="full" />
          </div>
        ))}
      </div>
    </section>
  );
}
