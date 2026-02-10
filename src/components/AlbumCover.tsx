import { useState } from "react";
import { cn } from "@/lib/utils";
import { Disc3 } from "lucide-react";

interface AlbumCoverProps {
  src?: string;
  alt: string;
  className?: string;
  onError?: () => void;
  shadow?: boolean;
}

export function AlbumCover({ src, alt, className, onError, shadow = true }: AlbumCoverProps) {
  const [failed, setFailed] = useState(!src);

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  const shadowClass = shadow ? "shadow-[0_4px_12px_rgba(0,0,0,0.25)]" : "";

  if (failed) {
    return (
      <div
        className={cn(
          "aspect-square bg-muted flex items-center justify-center",
          shadowClass,
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
      className={cn("aspect-square object-cover", shadowClass, className)}
      onError={handleError}
      loading="lazy"
    />
  );
}
