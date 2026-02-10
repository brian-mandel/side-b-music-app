import { useState } from "react";
import { cn } from "@/lib/utils";
import { Disc3 } from "lucide-react";

interface AlbumCoverProps {
  src?: string;
  alt: string;
  className?: string;
  onError?: () => void;
}

export function AlbumCover({ src, alt, className, onError }: AlbumCoverProps) {
  const [failed, setFailed] = useState(!src);

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  if (failed) {
    return (
      <div
        className={cn(
          "aspect-square bg-muted flex items-center justify-center",
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
      className={cn("aspect-square object-cover", className)}
      onError={handleError}
      loading="lazy"
    />
  );
}
