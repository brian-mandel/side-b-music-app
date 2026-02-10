import { useState } from "react";
import { Pencil, MessageSquare, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/components/RatingStars";
import { Link } from "react-router-dom";
import { Album, Rating } from "@/data/mockData";
import { AlbumCover } from "@/components/AlbumCover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MAX_TAKE_LENGTH = 500;

interface TakeWithAlbum extends Rating {
  album: Album;
}

interface RecentTakesProps {
  takes: TakeWithAlbum[];
  maxItems?: number;
  onTakeUpdate?: (takeId: string, rating: number, comment: string) => void;
}

export function RecentTakes({ takes, maxItems = 5, onTakeUpdate }: RecentTakesProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  const displayedTakes = takes.slice(0, maxItems);

  const handleEditClick = (take: TakeWithAlbum) => {
    setEditingId(take.id);
    setEditRating(take.rating);
    setEditComment(take.comment);
  };

  const handleSaveEdit = (takeId: string) => {
    onTakeUpdate?.(takeId, editRating, editComment);
    toast.success("Take updated!");
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditRating(0);
    setEditComment("");
  };

  if (takes.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-display font-semibold mb-4">Recent Takes</h2>
        <div className="text-center py-8 text-muted-foreground bg-card rounded-xl border border-border">
          <p>No takes yet. Add your first take above!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-display font-semibold mb-4">Recent Takes</h2>
      
      <div className="space-y-3">
        {displayedTakes.map((take) => (
          <div
            key={take.id}
            className="p-4 rounded-xl bg-card border border-border"
          >
            {editingId === take.id ? (
              /* Edit Mode */
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Link to={`/album/${take.album.id}`}>
                    <AlbumCover
                      src={take.album.coverUrl}
                      alt={take.album.title}
                      className="w-14 h-14 rounded-lg shadow-md"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/album/${take.album.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {take.album.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {take.album.artist}
                    </p>
                    <div className="mt-2">
                      <RatingStars
                        rating={editRating}
                        size="md"
                        interactive
                        onRatingChange={setEditRating}
                      />
                    </div>
                  </div>
                </div>
                <Textarea
                  value={editComment}
                  onChange={(e) =>
                    setEditComment(e.target.value.slice(0, MAX_TAKE_LENGTH))
                  }
                  className="bg-secondary border-transparent focus:border-primary/50 resize-none"
                  rows={2}
                  placeholder="What's your take?"
                />
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSaveEdit(take.id)}
                    className="bg-gradient-warm text-primary-foreground hover:opacity-90"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="flex items-start gap-3">
                <Link to={`/album/${take.album.id}`}>
                  <AlbumCover
                    src={take.album.coverUrl}
                    alt={take.album.title}
                    className="w-14 h-14 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/album/${take.album.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {take.album.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {take.album.artist} · {take.createdAt}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(take)}
                      className="shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <div className="mt-1">
                    <RatingStars rating={take.rating} size="sm" />
                  </div>
                  {take.comment && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {take.comment}
                    </p>
                  )}
                  <Link
                    to={`/album/${take.album.id}`}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <MessageSquare className="w-3 h-3" />
                    View discussion
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
