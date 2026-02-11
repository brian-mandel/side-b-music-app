import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CommentCard } from "@/components/CommentCard";
import { AlbumCard } from "@/components/AlbumCard";
import { SearchBar } from "@/components/SearchBar";
import { mockAlbums, getUserById, demoHotTakeIds } from "@/data/mockData";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, X, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTakes } from "@/hooks/useTakes";
import { useSavedAlbums } from "@/hooks/useSavedAlbums";
const newReleaseIds = ["15", "16", "17", "18"];
const newReleases = mockAlbums.filter(a => newReleaseIds.includes(a.id));
const trendingIds = ["11", "12", "13", "14"];
const trendingAlbums = mockAlbums.filter(a => trendingIds.includes(a.id));
const Index = () => {
  const {
    allTakes
  } = useTakes();
  const { savedIds } = useSavedAlbums();
  const [albumsMode, setAlbumsMode] = useState("new");
  const [takesMode, setTakesMode] = useState("friends");
  const [searchOpen, setSearchOpen] = useState(false);

  const savedAlbums = useMemo(() => {
    // Reverse so most recently saved is first
    return [...savedIds].reverse()
      .map((id) => mockAlbums.find((a) => a.id === id))
      .filter(Boolean) as typeof mockAlbums;
  }, [savedIds]);

  const displayedAlbums = albumsMode === "new" ? newReleases : albumsMode === "trending" ? trendingAlbums : savedAlbums;
  const topTakeIds = useMemo(() => {
    const sorted = [...allTakes].sort((a, b) => b.likes + b.replies - (a.likes + a.replies));
    return new Set(sorted.slice(0, 10).map((t) => t.id));
  }, [allTakes]);

  const displayedTakes = (() => {
    switch (takesMode) {
      case "hot": {
        // Use seeded hot take IDs, exclude any that overlap with top takes
        const hotTakeSet = new Set(demoHotTakeIds);
        const seeded = allTakes.filter(
          (t) =>
            hotTakeSet.has(t.id) &&
            t.comment &&
            t.comment.trim().length > 0 &&
            !topTakeIds.has(t.id)
        );
        // If seeded list is short, fill with computed hot takes
        if (seeded.length < 6) {
          const seededIds = new Set(seeded.map((t) => t.id));
          const maxEngagement = Math.max(1, ...allTakes.map((t) => t.likes + t.replies));
          const computed = allTakes
            .filter(
              (t) =>
                !seededIds.has(t.id) &&
                !topTakeIds.has(t.id) &&
                t.comment &&
                t.comment.trim().length > 0 &&
                (t.rating <= 2 || (t.rating >= 5 && t.rating > t.album.averageRating + 0.5))
            )
            .map((t) => {
              const deviation = Math.abs(t.rating - t.album.averageRating);
              const polarityBoost = t.rating <= 2 || t.rating >= 5 ? 1 : 0;
              const engagementBoost = (t.likes + t.replies) / maxEngagement;
              return { ...t, hotScore: deviation * 2 + polarityBoost + engagementBoost * 0.5 };
            })
            .sort((a, b) => b.hotScore - a.hotScore);
          return [...seeded, ...computed].slice(0, 8);
        }
        return seeded;
      }
      case "top":
        return [...allTakes].sort((a, b) => b.likes + b.replies - (a.likes + a.replies));
      case "friends":
      default:
        return allTakes;
    }
  })();
  return <AppLayout>
      <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
        {/* Welcome */}
        <section className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
            Welcome back, <span className="text-primary">Alex</span>
          </h1>
          <p className="text-muted-foreground">
            See what people are saying about albums and join the conversation.
          </p>
        </section>

        {/* Explore Search */}
        <section className="mb-8">
          {searchOpen ? <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-display font-semibold">Explore</h2>
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <SearchBar placeholder="Explore albums, artists, and people" />
            </div> : <button onClick={() => setSearchOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary border border-border/50 text-muted-foreground hover:border-border transition-colors text-sm">
              <Search className="w-4 h-4" />
              Explore albums, artists, and people
            </button>}
        </section>


        {/* Albums */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Albums</h2>
            <ToggleGroup type="single" value={albumsMode} onValueChange={v => v && setAlbumsMode(v)} className="border border-border rounded-md p-0.5">
              <ToggleGroupItem value="new" className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm">
                New Albums
              </ToggleGroupItem>
              <ToggleGroupItem value="trending" className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm">
                Trending Albums
              </ToggleGroupItem>
              <ToggleGroupItem value="saved" className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm">
                Saved Albums
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {albumsMode === "saved" && displayedAlbums.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Bookmark className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">No saved albums yet</p>
              <p className="text-xs text-muted-foreground mt-1">Tap the bookmark on an album to save it here.</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
              {displayedAlbums.map((album, index) => <AlbumCard key={album.id} id={album.id} title={album.title} artist={album.artist} cover_image_url={album.cover_image_url} releaseYear={album.releaseYear} showRating={false} size="md" className="shrink-0" style={{
              animationDelay: `${index * 0.1}s`
            } as React.CSSProperties} />)}
            </div>
          )}
        </section>

        {/* Takes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Takes</h2>
            <ToggleGroup type="single" value={takesMode} onValueChange={v => v && setTakesMode(v)} className="border border-border rounded-md p-0.5">
              <ToggleGroupItem value="friends" className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm">
                Friends
              </ToggleGroupItem>
              <ToggleGroupItem value="top" className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm">
                Top Takes
              </ToggleGroupItem>
              <ToggleGroupItem value="hot" className="text-xs px-3 py-1 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm">
                Hot Takes
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-4">
            {displayedTakes.map((take, index) => {
            const user = getUserById(take.userId);
            return <CommentCard key={take.id} id={take.id} user={{
              id: take.userId,
              name: user?.name || "You",
              avatar: user?.avatar
            }} album={{
              id: take.album.id,
              title: take.album.title,
              artist: take.album.artist,
              cover_image_url: take.album.cover_image_url
            }} rating={take.rating} comment={take.comment} likes={take.likes} replies={take.replies} createdAt={take.createdAt} style={{
              animationDelay: `${index * 0.1}s`
            } as React.CSSProperties} />;
          })}
          </div>
        </section>
      </div>
    </AppLayout>;
};
export default Index;