import { useState, useMemo, useRef } from "react";
import { ChevronDown, Pencil, MessageSquare, Users, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/RatingStars";
import { Link } from "react-router-dom";
import { Album, Rating, mockRatings } from "@/data/mockData";
import { AlbumCover } from "@/components/AlbumCover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TakeWithAlbum extends Rating {
  album: Album;
}
interface AllTakesProps {
  takes: TakeWithAlbum[];
  onEditTake?: (take: TakeWithAlbum) => void;
}

// Mock: album IDs that friends have also rated
const FRIEND_RATED_ALBUM_IDS = new Set(
  mockRatings.filter((r) => r.userId !== "1").map((r) => r.albumId)
);

export function AllTakes({ takes, onEditTake }: AllTakesProps) {
  const [artistQuery, setArtistQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [sharedOnly, setSharedOnly] = useState(false);
  const [artistDropdownOpen, setArtistDropdownOpen] = useState(false);
  const artistInputRef = useRef<HTMLInputElement>(null);

  const uniqueArtists = useMemo(() => {
    const artists = new Set(takes.map((t) => t.album.artist));
    return Array.from(artists).sort();
  }, [takes]);

  const matchedArtists = useMemo(() => {
    if (!artistQuery) return uniqueArtists;
    const q = artistQuery.toLowerCase();
    return uniqueArtists.filter((a) => a.toLowerCase().includes(q));
  }, [uniqueArtists, artistQuery]);

  const uniqueGenres = useMemo(() => {
    const genres = new Set(takes.flatMap((t) => t.album.genre));
    return Array.from(genres).sort();
  }, [takes]);

  const filteredTakes = useMemo(() => {
    return takes.filter((take) => {
      if (artistQuery) {
        const q = artistQuery.toLowerCase();
        if (!take.album.artist.toLowerCase().includes(q)) return false;
      }
      if (ratingFilter && Math.floor(take.rating) !== ratingFilter) return false;
      if (genreFilter && !take.album.genre.includes(genreFilter)) return false;
      if (sharedOnly && !FRIEND_RATED_ALBUM_IDS.has(take.albumId)) return false;
      return true;
    });
  }, [takes, artistQuery, ratingFilter, genreFilter, sharedOnly]);

  const hasFilters = artistQuery || ratingFilter || genreFilter || sharedOnly;

  const clearFilters = () => {
    setArtistQuery("");
    setRatingFilter(null);
    setGenreFilter(null);
    setSharedOnly(false);
  };

  if (takes.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-display font-semibold">All Takes</h2>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-primary hover:underline">
            Clear filters
          </button>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Artist typeahead */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              ref={artistInputRef}
              placeholder="Artist"
              value={artistQuery}
              onChange={(e) => {
                setArtistQuery(e.target.value);
                setArtistDropdownOpen(true);
              }}
              onFocus={() => setArtistDropdownOpen(true)}
              onBlur={() => setTimeout(() => setArtistDropdownOpen(false), 150)}
              className="h-8 w-36 pl-7 pr-7 text-xs"
            />
            {artistQuery && (
              <button
                onClick={() => { setArtistQuery(""); artistInputRef.current?.focus(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          {artistDropdownOpen && matchedArtists.length > 0 && artistQuery.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-48 max-h-40 overflow-y-auto rounded-md border border-border bg-popover z-50 shadow-md">
              {matchedArtists.map((artist) => (
                <button
                  key={artist}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-accent transition-colors"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setArtistQuery(artist);
                    setArtistDropdownOpen(false);
                  }}
                >
                  {artist}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              Rating
              {ratingFilter && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                  {ratingFilter}★
                </Badge>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-popover z-50">
            <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={ratingFilter === null} onCheckedChange={() => setRatingFilter(null)}>
              All Ratings
            </DropdownMenuCheckboxItem>
            {[5, 4, 3, 2, 1].map((r) => (
              <DropdownMenuCheckboxItem key={r} checked={ratingFilter === r} onCheckedChange={() => setRatingFilter(r)}>
                {r} Stars
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Genre Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1 h-8 text-xs">
              Genre
              {genreFilter && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">
                  {genreFilter.length > 8 ? genreFilter.slice(0, 8) + "…" : genreFilter}
                </Badge>
              )}
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="max-h-60 overflow-y-auto bg-popover z-50">
            <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={genreFilter === null} onCheckedChange={() => setGenreFilter(null)}>
              All Genres
            </DropdownMenuCheckboxItem>
            {uniqueGenres.map((genre) => (
              <DropdownMenuCheckboxItem key={genre} checked={genreFilter === genre} onCheckedChange={() => setGenreFilter(genre)}>
                {genre}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Shared with friends toggle */}
        <Button
          variant={sharedOnly ? "secondary" : "outline"}
          size="sm"
          className="gap-1 h-8 text-xs"
          onClick={() => setSharedOnly(!sharedOnly)}
        >
          <Users className="w-3 h-3" />
          Shared
        </Button>
      </div>

      {filteredTakes.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground bg-card rounded-xl border border-border">
          <p>No takes match your filters.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTakes.map((take) => (
            <div key={take.id} className="p-4 rounded-xl bg-card border border-primary">
              <div className="flex items-start gap-3">
                <Link to={`/album/${take.album.id}`}>
                  <AlbumCover
                    src={take.album.cover_image_url}
                    alt={take.album.title}
                    className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/album/${take.album.id}`}
                        className="font-semibold text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {take.album.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {take.album.artist} · {take.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <RatingStars rating={take.rating} size="sm" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditTake?.(take)}
                        className="shrink-0 h-7 w-7 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {take.comment && (
                    <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                      {take.comment}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <Link
                      to={`/album/${take.album.id}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <MessageSquare className="w-3 h-3" />
                      View discussion
                    </Link>
                    <div className="flex gap-1">
                      {take.album.genre.slice(0, 2).map((g) => (
                        <Badge key={g} variant="outline" className="text-xs px-1.5 py-0">
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}