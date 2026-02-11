import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { RatingStars } from "@/components/RatingStars";
import { CommentCard } from "@/components/CommentCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Share2, Bookmark, BookmarkCheck, Play, ChevronDown } from "lucide-react";
import { getAlbumById, getUserById, type StreamingLinks } from "@/data/mockData";
import { AlbumCover } from "@/components/AlbumCover";
import { useState } from "react";
import { useTakes } from "@/hooks/useTakes";
import { ShareAlbumDialog } from "@/components/ShareAlbumDialog";
import { toast } from "sonner";
import { useSavedAlbums } from "@/hooks/useSavedAlbums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PLATFORMS: { key: keyof StreamingLinks; label: string }[] = [
  { key: "spotify", label: "Spotify" },
  { key: "apple_music", label: "Apple Music" },
  { key: "youtube_music", label: "YouTube Music" },
  { key: "tidal", label: "Tidal" },
  { key: "soundcloud", label: "SoundCloud" },
];

const AlbumDetail = () => {
  const { id } = useParams<{ id: string }>();
  const album = getAlbumById(id || "1");
  const { addTake, getUserTakeForAlbum, getTakesForAlbum } = useTakes();
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const { isSaved, toggleSave } = useSavedAlbums();

  if (!album) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Album not found</p>
        </div>
      </AppLayout>
    );
  }

  const existingTake = getUserTakeForAlbum(album.id);
  const albumTakes = getTakesForAlbum(album.id);

  const handleSubmit = () => {
    if (userRating === 0) return;
    addTake(album.id, userRating, comment);
    toast.success("Take posted!");
    setUserRating(0);
    setComment("");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pb-20 lg:pb-0">
        {/* Back Button */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Album Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="shrink-0">
            <AlbumCover
              src={album.cover_image_url}
              alt={album.title}
              className="w-full md:w-64 rounded-xl shadow-lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {album.genre.map((g) => (
                <Badge key={g} variant="secondary" className="text-xs">
                  {g}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
              {album.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {album.artist} · {album.releaseYear}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 [--star-empty:216_19%_26%]">
                <RatingStars rating={album.averageRating} size="lg" />
                <span className="text-2xl font-bold text-gradient">
                  {album.averageRating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {album.ratingsCount.toLocaleString()} takes
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-gradient-warm text-primary-foreground hover:opacity-90">
                    <Play className="w-4 h-4" />
                    Listen on
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-popover z-50">
                  {PLATFORMS.map((platform) => (
                    <DropdownMenuItem
                      key={platform.key}
                      onClick={() => {
                        const link = album.streaming_links?.[platform.key];
                        if (link) {
                          window.open(link, "_blank", "noopener,noreferrer");
                        } else {
                          toast.info(`Link not available for ${platform.label} yet.`);
                        }
                      }}
                    >
                      {platform.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => {
                  toggleSave(album.id);
                  toast.success(
                    isSaved(album.id) ? "Removed from saved" : "Saved to Your albums"
                  );
                }}
              >
                {isSaved(album.id) ? (
                  <BookmarkCheck className="w-4 h-4 text-primary" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
              <Button variant="secondary" size="icon" onClick={() => setShareOpen(true)}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Add a Take */}
        <section className="p-6 rounded-xl bg-primary text-primary-foreground border border-border mb-8">
          <h2 className="text-lg font-display font-semibold mb-4">
            {existingTake ? "Update Your Take" : "Add Your Take"}
          </h2>
          {existingTake && (
            <div className="mb-4 p-3 rounded-lg bg-secondary/50 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Your current take</p>
              <div className="flex items-center gap-2">
                <RatingStars rating={existingTake.rating} size="sm" />
                {existingTake.comment && (
                  <p className="text-sm text-foreground/80 truncate">— {existingTake.comment}</p>
                )}
              </div>
            </div>
          )}
          <div className="mb-4">
            <RatingStars
              rating={userRating}
              size="lg"
              interactive
              onRatingChange={setUserRating}
            />
          </div>
          <Textarea
            placeholder="What's your take?"
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 500))}
            className="mb-4 bg-white border-primary focus:border-primary"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <Button
              disabled={userRating === 0}
              onClick={handleSubmit}
              className="bg-gradient-warm text-primary-foreground hover:opacity-90"
            >
              Post Take
            </Button>
            <span className="text-xs text-primary-foreground">{comment.length}/500</span>
          </div>
        </section>

        {/* Discussion */}
        <section>
          <h2 className="text-xl font-display font-semibold mb-4">
            Discussion ({albumTakes.length})
          </h2>
          <div className="space-y-4">
            {albumTakes.length > 0 ? (
              albumTakes.map((take) => {
                const user = getUserById(take.userId);
                return (
                  <CommentCard
                    key={take.id}
                    id={take.id}
                    user={{
                      id: take.userId,
                      name: user?.name || "You",
                      avatar: user?.avatar,
                    }}
                    rating={take.rating}
                    comment={take.comment}
                    likes={take.likes}
                    replies={take.replies}
                    createdAt={take.createdAt}
                    showAlbum={false}
                  />
                );
              })
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No takes yet. Be the first to share yours!
              </p>
            )}
          </div>
        </section>
      </div>

      <ShareAlbumDialog
        album={{
          id: album.id,
          title: album.title,
          artist: album.artist,
          cover_image_url: album.cover_image_url,
        }}
        sharedFriendsCount={0}
        open={shareOpen}
        onOpenChange={setShareOpen}
      />
    </AppLayout>
  );
};

export default AlbumDetail;
