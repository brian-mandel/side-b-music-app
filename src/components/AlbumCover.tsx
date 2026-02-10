import { useState } from "react";
import { cn } from "@/lib/utils";
import { Disc3 } from "lucide-react";

interface AlbumCoverProps {
  src?: string | null;
  alt: string;
  className?: string;
  onError?: () => void;
}

const ALBUM_COVER_STYLE = "aspect-square rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.25)]";

export function AlbumCover({ src, alt, className, onError }: AlbumCoverProps) {
  const [failed, setFailed] = useState(!src);

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  if (failed || !src) {
    return (
      <div
        className={cn(
          ALBUM_COVER_STYLE,
          "bg-muted flex items-center justify-center",
          className
        )}
        aria-label={alt}
      >
        <Disc3 className="w-1/3 h-1/3 text-muted-foreground/50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(ALBUM_COVER_STYLE, "object-cover", className)}
      onError={handleError}
      loading="lazy"
    />
  );
}
