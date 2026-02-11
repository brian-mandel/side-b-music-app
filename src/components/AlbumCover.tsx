import { useState } from "react";
import { cn } from "@/lib/utils";
import { Disc3 } from "lucide-react";

interface AlbumCoverProps {
  src?: string | null;
  alt: string;
  className?: string;
  onError?: () => void;
}

const ALBUM_SHADOW = "";

export function AlbumCover({ src, alt, className, onError }: AlbumCoverProps) {
  const [failed, setFailed] = useState(!src);

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  return (
    <div className={cn("aspect-square rounded-lg", ALBUM_SHADOW, className)}>
      {failed || !src ? (
        <div
          className="w-full h-full rounded-[inherit] overflow-hidden bg-muted flex items-center justify-center"
          aria-label={alt}
        >
          <Disc3 className="w-1/3 h-1/3 text-muted-foreground/50" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-[inherit] overflow-hidden object-cover"
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
}
