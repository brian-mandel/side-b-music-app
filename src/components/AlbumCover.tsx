import { useState } from "react";
import { cn } from "@/lib/utils";
import { Disc3 } from "lucide-react";

interface AlbumCoverProps {
  src?: string | null;
  alt: string;
  className?: string;
  onError?: () => void;
}

const SHADOW = "shadow-[0_6px_14px_rgba(0,0,0,0.25)]";

export function AlbumCover({ src, alt, className, onError }: AlbumCoverProps) {
  const [failed, setFailed] = useState(!src);

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  return (
    <div className={cn("aspect-square rounded-lg overflow-hidden", SHADOW, className)}>
      {failed || !src ? (
        <div
          className="w-full h-full bg-muted flex items-center justify-center"
          aria-label={alt}
        >
          <Disc3 className="w-1/3 h-1/3 text-muted-foreground/50" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
}
