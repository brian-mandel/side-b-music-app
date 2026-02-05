import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Search, Star, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockAlbums, mockRatings, Album, getUserById } from "@/data/mockData";
import { RatingStars } from "@/components/RatingStars";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const MAX_COMMENT_LENGTH = 500;

// Get current user's ratings (user id "1" is Alex Rivera, the logged-in user)
const getCurrentUserRatings = () => {
  return mockRatings
    .filter((r) => r.userId === "1")
    .map((rating) => ({
      ...rating,
      album: mockAlbums.find((a) => a.id === rating.albumId)!,
    }));
};

export default function YourPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingRatingId, setEditingRatingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  const userRatings = getCurrentUserRatings();

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

  const handleSubmitRating = () => {
    if (!selectedAlbum || rating === 0) return;

    // In real app, this would save to database and update feed + album discussion
    toast.success("Rating submitted!", {
      description: `You rated "${selectedAlbum.title}" ${rating} stars`,
    });

    // Reset form
    setSelectedAlbum(null);
    setRating(0);
    setComment("");
  };

  const handleEditClick = (ratingItem: typeof userRatings[0]) => {
    setEditingRatingId(ratingItem.id);
    setEditRating(ratingItem.rating);
    setEditComment(ratingItem.comment);
  };

  const handleSaveEdit = (ratingId: string) => {
    // In real app, this would update the database
    toast.success("Rating updated!", {
      description: "Your rating has been updated",
    });
    setEditingRatingId(null);
  };

  const handleCancelEdit = () => {
    setEditingRatingId(null);
    setEditRating(0);
    setEditComment("");
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pb-20 lg:pb-0">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
            Your <span className="text-gradient">Page</span>
          </h1>
          <p className="text-muted-foreground">
            Rate albums and manage your music journey.
          </p>
        </section>

        {/* Prominent Album Search & Rating Section */}
        <section className="mb-10 p-6 rounded-xl bg-card border border-border">
          <h2 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Rate an Album
          </h2>

          {!selectedAlbum ? (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for an album to rate..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 h-12 text-base bg-secondary border-transparent focus:border-primary/50"
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
              <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
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
                  Add a comment{" "}
                  <span className="text-muted-foreground/60">(optional)</span>
                </label>
                <Textarea
                  placeholder="Share your thoughts about this album..."
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))
                  }
                  className="bg-secondary border-transparent focus:border-primary/50 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-1">
                  <span
                    className={cn(
                      "text-xs",
                      comment.length >= MAX_COMMENT_LENGTH
                        ? "text-destructive"
                        : "text-muted-foreground/60"
                    )}
                  >
                    {comment.length}/{MAX_COMMENT_LENGTH}
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
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  className="flex-1 bg-gradient-warm text-primary-foreground hover:opacity-90"
                >
                  Submit Rating
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* User's Recently Rated Albums */}
        <section>
          <h2 className="text-xl font-display font-semibold mb-4">
            Your Ratings
          </h2>

          {userRatings.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>You haven't rated any albums yet.</p>
              <p className="text-sm">Search above to rate your first album!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userRatings.map((ratingItem) => (
                <div
                  key={ratingItem.id}
                  className="p-4 rounded-xl bg-card border border-border animate-fade-in"
                >
                  {editingRatingId === ratingItem.id ? (
                    /* Edit Mode */
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Link to={`/album/${ratingItem.album.id}`}>
                          <img
                            src={ratingItem.album.coverUrl}
                            alt={ratingItem.album.title}
                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/album/${ratingItem.album.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {ratingItem.album.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {ratingItem.album.artist}
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
                          setEditComment(
                            e.target.value.slice(0, MAX_COMMENT_LENGTH)
                          )
                        }
                        className="bg-secondary border-transparent focus:border-primary/50 resize-none"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(ratingItem.id)}
                          className="bg-gradient-warm text-primary-foreground hover:opacity-90"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="flex items-start gap-4">
                      <Link to={`/album/${ratingItem.album.id}`}>
                        <img
                          src={ratingItem.album.coverUrl}
                          alt={ratingItem.album.title}
                          className="w-16 h-16 rounded-lg object-cover shadow-md hover:shadow-lg transition-shadow"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/album/${ratingItem.album.id}`}
                              className="font-semibold text-foreground hover:text-primary transition-colors"
                            >
                              {ratingItem.album.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {ratingItem.album.artist} · {ratingItem.createdAt}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(ratingItem)}
                            className="shrink-0 text-muted-foreground hover:text-foreground"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="mt-2">
                          <RatingStars rating={ratingItem.rating} size="sm" />
                        </div>
                        {ratingItem.comment && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {ratingItem.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
