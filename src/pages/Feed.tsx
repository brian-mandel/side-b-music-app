import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CommentCard } from "@/components/CommentCard";
import { AlbumCard } from "@/components/AlbumCard";
import { SearchBar } from "@/components/SearchBar";
import { mockAlbums, getEnrichedRatings } from "@/data/mockData";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const newReleases = mockAlbums.filter((a) => a.isNewRelease);
const trendingAlbums = mockAlbums.filter((a) => !a.isNewRelease).slice(0, 5);

const Index = () => {
  const enrichedRatings = getEnrichedRatings();
  const [albumsMode, setAlbumsMode] = useState("new");
  const [takesMode, setTakesMode] = useState("friends");
  const [searchOpen, setSearchOpen] = useState(false);

  const displayedAlbums = albumsMode === "new" ? newReleases : trendingAlbums;

  const displayedTakes = (() => {
    switch (takesMode) {
      case "hot":
        return [...enrichedRatings].sort((a, b) => {
          const aDeviation = Math.abs(a.rating - a.album.averageRating);
          const bDeviation = Math.abs(b.rating - b.album.averageRating);
          return bDeviation + b.replies - (aDeviation + a.replies);
        });
      case "top":
        return [...enrichedRatings].sort((a, b) => b.likes + b.replies - (a.likes + a.replies));
      case "friends":
      default:
        // Mock: chronological (already in order)
        return enrichedRatings;
    }
  })();
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
        {/* Welcome */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl lg:text-4xl font-display font-bold">
              Welcome back, <span className="text-gradient">Alex</span>
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="shrink-0"
            >
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
          <p className="text-muted-foreground">
            See what people are saying about albums and join the conversation.
          </p>
          {searchOpen && (
            <div className="mt-4 animate-fade-in">
              <SearchBar placeholder="Search albums, artists, users..." />
            </div>
          )}
        </section>

        {/* Albums */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Albums</h2>
            <ToggleGroup
              type="single"
              value={albumsMode}
              onValueChange={(v) => v && setAlbumsMode(v)}
              className="border border-border rounded-md p-0.5"
            >
              <ToggleGroupItem
                value="new"
                className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm"
              >
                New Albums
              </ToggleGroupItem>
              <ToggleGroupItem
                value="trending"
                className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm"
              >
                Trending Albums
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
            {displayedAlbums.map((album, index) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                title={album.title}
                artist={album.artist}
                coverUrl={album.coverUrl}
                releaseYear={album.releaseYear}
                showRating={false}
                size="md"
                className="shrink-0"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </section>

        {/* Takes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Takes</h2>
            <ToggleGroup
              type="single"
              value={takesMode}
              onValueChange={(v) => v && setTakesMode(v)}
              className="border border-border rounded-md p-0.5"
            >
              <ToggleGroupItem
                value="friends"
                className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm"
              >
                Friends
              </ToggleGroupItem>
              <ToggleGroupItem
                value="top"
                className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm"
              >
                Top Takes
              </ToggleGroupItem>
              <ToggleGroupItem
                value="hot"
                className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm"
              >
                Hot Takes
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-4">
            {displayedTakes.map((rating, index) => (
              <CommentCard
                key={rating.id}
                id={rating.id}
                user={{
                  id: rating.user.id,
                  name: rating.user.name,
                  avatar: rating.user.avatar,
                }}
                album={{
                  id: rating.album.id,
                  title: rating.album.title,
                  artist: rating.album.artist,
                  coverUrl: rating.album.coverUrl,
                }}
                rating={rating.rating}
                comment={rating.comment}
                likes={rating.likes}
                replies={rating.replies}
                createdAt={rating.createdAt}
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
