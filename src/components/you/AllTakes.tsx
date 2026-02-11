import { useState, useMemo } from "react";
import { Filter, ChevronDown, Pencil, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/RatingStars";
import { Link } from "react-router-dom";
import { Album, Rating, mockAlbums } from "@/data/mockData";
import { AlbumCover } from "@/components/AlbumCover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
interface TakeWithAlbum extends Rating {
  album: Album;
}
interface AllTakesProps {
  takes: TakeWithAlbum[];
  onEditTake?: (take: TakeWithAlbum) => void;
}
export function AllTakes({
  takes,
  onEditTake
}: AllTakesProps) {
  const [artistFilter, setArtistFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [sharedOnly, setSharedOnly] = useState(false);

  // Extract unique artists, genres from user's takes
  const uniqueArtists = useMemo(() => {
    const artists = new Set(takes.map(t => t.album.artist));
    return Array.from(artists).sort();
  }, [takes]);
  const uniqueGenres = useMemo(() => {
    const genres = new Set(takes.flatMap(t => t.album.genre));
    return Array.from(genres).sort();
  }, [takes]);

  // Filter takes
  const filteredTakes = useMemo(() => {
    return takes.filter(take => {
      if (artistFilter && take.album.artist !== artistFilter) return false;
      if (ratingFilter && Math.floor(take.rating) !== ratingFilter) return false;
      if (genreFilter && !take.album.genre.includes(genreFilter)) return false;
      // Shared filter would check if friends also rated this album (mock for now)
      return true;
    });
  }, [takes, artistFilter, ratingFilter, genreFilter, sharedOnly]);
  const activeFiltersCount = [artistFilter, ratingFilter, genreFilter, sharedOnly].filter(Boolean).length;
  const clearFilters = () => {
    setArtistFilter(null);
    setRatingFilter(null);
    setGenreFilter(null);
    setSharedOnly(false);
  };
  if (takes.length === 0) {
    return null;
  }
  return <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display font-semibold">All Takes</h2>
        
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
              Clear filters
            </Button>}
          
          {/* Artist Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Artist
                {artistFilter && <Badge variant="secondary" className="ml-1 px-1.5 py-0">{artistFilter.slice(0, 8)}...</Badge>}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
              <DropdownMenuLabel>Filter by Artist</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={artistFilter === null} onCheckedChange={() => setArtistFilter(null)}>
                All Artists
              </DropdownMenuCheckboxItem>
              {uniqueArtists.map(artist => <DropdownMenuCheckboxItem key={artist} checked={artistFilter === artist} onCheckedChange={() => setArtistFilter(artist)}>
                  {artist}
                </DropdownMenuCheckboxItem>)}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rating Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Rating
                {ratingFilter && <Badge variant="secondary" className="ml-1 px-1.5 py-0">{ratingFilter}★</Badge>}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Rating</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={ratingFilter === null} onCheckedChange={() => setRatingFilter(null)}>
                All Ratings
              </DropdownMenuCheckboxItem>
              {[5, 4, 3, 2, 1].map(rating => <DropdownMenuCheckboxItem key={rating} checked={ratingFilter === rating} onCheckedChange={() => setRatingFilter(rating)}>
                  {rating} Stars
                </DropdownMenuCheckboxItem>)}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Genre Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Genre
                {genreFilter && <Badge variant="secondary" className="ml-1 px-1.5 py-0">{genreFilter.slice(0, 6)}...</Badge>}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-60 overflow-y-auto">
              <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={genreFilter === null} onCheckedChange={() => setGenreFilter(null)}>
                All Genres
              </DropdownMenuCheckboxItem>
              {uniqueGenres.map(genre => <DropdownMenuCheckboxItem key={genre} checked={genreFilter === genre} onCheckedChange={() => setGenreFilter(genre)}>
                  {genre}
                </DropdownMenuCheckboxItem>)}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Shared Takes Filter */}
          <Button variant={sharedOnly ? "secondary" : "outline"} size="sm" className="gap-1" onClick={() => setSharedOnly(!sharedOnly)}>
            <Users className="w-3 h-3" />
            Shared
          </Button>
        </div>
      </div>

      {filteredTakes.length === 0 ? <div className="text-center py-8 text-muted-foreground bg-card rounded-xl border border-border">
          <p>No takes match your filters.</p>
        </div> : <div className="space-y-3">
          {filteredTakes.map(take => <div key={take.id} className="p-4 rounded-xl bg-card border border-primary">
              <div className="flex items-start gap-3">
                <Link to={`/album/${take.album.id}`}>
                  <AlbumCover src={take.album.cover_image_url} alt={take.album.title} className="w-12 h-12 rounded-lg shadow-md hover:shadow-lg transition-shadow" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/album/${take.album.id}`} className="font-semibold text-sm text-foreground hover:text-primary transition-colors">
                        {take.album.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {take.album.artist} · {take.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <RatingStars rating={take.rating} size="sm" />
                      <Button variant="ghost" size="icon" onClick={() => onEditTake?.(take)} className="shrink-0 h-7 w-7 text-muted-foreground hover:text-foreground">
                        <Pencil className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {take.comment && <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                      {take.comment}
                    </p>}
                  <div className="mt-2 flex items-center gap-3">
                    <Link to={`/album/${take.album.id}`} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <MessageSquare className="w-3 h-3" />
                      View discussion
                    </Link>
                    <div className="flex gap-1">
                      {take.album.genre.slice(0, 2).map(g => <Badge key={g} variant="outline" className="text-xs px-1.5 py-0">
                          {g}
                        </Badge>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div>}
    </section>;
}