import React from "react";
import { cn } from "@/lib/utils";

export const DetailRow = React.memo(({ label, value, highlight, valueClassName }: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
  valueClassName?: string;
}) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-xs text-muted-foreground font-body">{label}</span>
    <span className={cn(
      "font-heading font-bold text-sm",
      valueClassName ? valueClassName : highlight ? "text-primary" : "text-foreground"
    )}>{value}</span>
  </div>
));
DetailRow.displayName = "DetailRow";

export const StatCard = React.memo(({ icon, label, value, highlight }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className={cn(
    "rounded-[10px] p-4 md:p-5 space-y-2 glass-card",
    highlight && "glow-border"
  )}>
    <div className="text-primary">{icon}</div>
    <span className="text-[10px] md:text-xs text-muted-foreground font-body uppercase tracking-[0.12em] block">{label}</span>
    <p className={cn(
      "font-heading font-black text-primary leading-none",
      highlight ? "text-xl md:text-2xl" : "text-lg md:text-xl"
    )}>{value}</p>
  </div>
));
StatCard.displayName = "StatCard";

export const ProfileItem = React.memo(({ label, value, highlight }: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="space-y-1">
    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground/70 font-heading">{label}</p>
    <p className={cn("font-heading font-bold text-sm sm:text-base", highlight ? "text-primary" : "text-foreground")}>{value}</p>
  </div>
));
ProfileItem.displayName = "ProfileItem";

export const VideoCard = React.memo(({ id, title }: { id: string; title: string }) => {
  const [playing, setPlaying] = React.useState(false);
  return (
    <div className="group relative rounded-[var(--radius)] overflow-hidden border border-border/30 transition-all duration-300">
      {playing ? (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button onClick={() => setPlaying(true)} className="w-full text-left">
          <div className="aspect-video relative">
            <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt={title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-destructive rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-foreground ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-3 bg-card">
            <p className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">{title}</p>
          </div>
        </button>
      )}
    </div>
  );
});
VideoCard.displayName = "VideoCard";

export const TabletCarousel = React.memo(() => {
  const [current, setCurrent] = React.useState(0);
  // Lazy import images only when this component mounts
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    Promise.all([
      import("@/assets/mockup-tablet-1.webp"),
      import("@/assets/mockup-tablet-2.webp"),
    ]).then(([a, b]) => setImages([a.default, b.default]));
  }, []);

  React.useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return <div className="w-full max-w-[420px] aspect-[4/3]" />;

  return (
    <div className="relative w-full max-w-[420px]">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Mockup tablet ${idx + 1}`}
          className={cn(
            "w-full drop-shadow-2xl transition-opacity duration-700 absolute inset-0",
            idx === current ? "opacity-100 relative" : "opacity-0"
          )}
        />
      ))}
    </div>
  );
});
TabletCarousel.displayName = "TabletCarousel";
