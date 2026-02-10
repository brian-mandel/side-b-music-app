import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { RatingStars } from "./RatingStars";
import { AlbumCover } from "./AlbumCover";
import { Link } from "react-router-dom";
import { Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRatingDialog } from "@/hooks/useRatingDialog";
import { mockAlbums, mockRatings } from "@/data/mockData";
import { ShareAlbumDialog } from "@/components/ShareAlbumDialog";

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  rating?: number;
  userRating?: number;
  releaseYear?: number;
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  showRateButton?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const sizeClasses = {
  sm: "w-32",
  md: "w-44",
  lg: "w-56",
};

const coverSizeClasses = {
  sm: "h-32",
  md: "h-44",
  lg: "h-56",
};

// Mock: count how many friends have takes on this album
function getSharedFriendsCount(albumId: string): number {
  const friendIds = ["2", "3"]; // mock friend IDs
  return mockRatings.filter(
    (r) => r.albumId === albumId && friendIds.includes(r.userId)
  ).length;
}

export function AlbumCard({
  id,
  title,
  artist,
  coverUrl,
  rating,
  userRating,
  releaseYear,
  size = "md",
  showRating = true,
  showRateButton = true,
  className,
  style,
}: AlbumCardProps) {
  const { openRatingDialog } = useRatingDialog();
  const [shareOpen, setShareOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const sharedFriendsCount = getSharedFriendsCount(id);
  const hasSharedTakes = sharedFriendsCount > 0;

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareOpen(true);
  };

  const handleRateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const album = mockAlbums.find((a) => a.id === id);
    if (album) {
      openRatingDialog(album);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (sharedFriendsCount > 0) {
      e.preventDefault();
      e.stopPropagation();
      setShareOpen(true);
    }
  };

  const handleTouchStart = useCallback(() => {
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      if (sharedFriendsCount > 0) {
        setShareOpen(true);
      }
    }, 500);
  }, [sharedFriendsCount]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (didLongPress.current) {
      e.preventDefault();
    }
  }, []);

  return (
    <>
      <Link
        to={`/album/${id}`}
        className={cn(
          sizeClasses[size],
          "group flex flex-col gap-2 animate-fade-in",
          className
        )}
        style={style}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-lg",
            coverSizeClasses[size]
          )}
        >
          <AlbumCover
            src={coverUrl}
            alt={`${title} by ${artist}`}
            className="album-cover w-full h-full rounded-none"
          />
          {userRating && (
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-background/90 backdrop-blur-sm">
              <RatingStars rating={userRating} size="sm" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Share button for shared albums */}
          {hasSharedTakes && (
            <button
              onClick={handleShareClick}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
          
          {showRateButton && (
            <Button
              size="sm"
              onClick={handleRateClick}
              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1 bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm"
            >
              <Star className="w-3 h-3" />
              Rate
            </Button>
          )}
        </div>
        
        <div className="flex flex-col gap-0.5">
          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {artist}
            {releaseYear && <span className="opacity-70"> · {releaseYear}</span>}
          </p>
          {showRating && rating && (
            <div className="mt-1">
              <RatingStars rating={rating} size="sm" showValue />
            </div>
          )}
        </div>
      </Link>

      <ShareAlbumDialog
        album={{ id, title, artist, coverUrl }}
        sharedFriendsCount={sharedFriendsCount}
        open={shareOpen}
        onOpenChange={setShareOpen}
      />
    </>
  );
}