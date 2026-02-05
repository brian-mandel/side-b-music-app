import { useState } from "react";
import { Search, Flame, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/components/RatingStars";
import { Album, mockAlbums } from "@/data/mockData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MAX_TAKE_LENGTH = 500;

interface AddTakeProps {
  onTakeSubmitted?: (albumId: string, rating: number, comment: string) => void;
}

export function AddTake({ onTakeSubmitted }: AddTakeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = mockAlbums.filter(
        (album) =>
          album.title.toLowerCase().includes(query.toLowerCase()) ||
          album.artist.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setSearchQuery("");
    setSearchResults([]);
    setRating(0);
    setComment("");
  };

  const handleClearSelection = () => {
    setSelectedAlbum(null);
    setRating(0);
    setComment("");
  };

  const handleSubmitTake = () => {
    if (!selectedAlbum || rating === 0) return;

    onTakeSubmitted?.(selectedAlbum.id, rating, comment);
    
    toast.success("Take added!", {
      description: `You rated "${selectedAlbum.title}" ${rating} stars`,
    });

    setSelectedAlbum(null);
    setRating(0);
    setComment("");
  };

  return (
    <section className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/20 shadow-lg">
      <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
        <Flame className="w-5 h-5 text-primary" />
        Add a Take
      </h2>

      {!selectedAlbum ? (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for an album..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-12 text-base bg-background border-border focus:border-primary"
          />

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-scale-in">
              <div className="max-h-64 overflow-y-auto">
                {searchResults.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => handleSelectAlbum(album)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors text-left"
                  >
                    <img
                      src={album.coverUrl}
                      alt={album.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {album.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {album.artist} · {album.releaseYear}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchQuery.length > 0 && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg p-4 text-center z-50">
              <p className="text-sm text-muted-foreground">
                No albums found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Selected Album */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
            <img
              src={selectedAlbum.coverUrl}
              alt={selectedAlbum.title}
              className="w-20 h-20 rounded-lg object-cover shadow-md"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground truncate">
                    {selectedAlbum.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAlbum.artist} · {selectedAlbum.releaseYear}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearSelection}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-3">
                <RatingStars
                  rating={rating}
                  size="lg"
                  interactive
                  onRatingChange={setRating}
                />
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              What's your take?{" "}
              <span className="text-muted-foreground/60">(optional)</span>
            </label>
            <Textarea
              placeholder="Share your thoughts about this album..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value.slice(0, MAX_TAKE_LENGTH))
              }
              className="bg-background border-border focus:border-primary resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-1">
              <span
                className={cn(
                  "text-xs",
                  comment.length >= MAX_TAKE_LENGTH
                    ? "text-destructive"
                    : "text-muted-foreground/60"
                )}
              >
                {comment.length}/{MAX_TAKE_LENGTH}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={handleClearSelection}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitTake}
              disabled={rating === 0}
              className="flex-1 bg-gradient-warm text-primary-foreground hover:opacity-90"
            >
              Submit Take
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
