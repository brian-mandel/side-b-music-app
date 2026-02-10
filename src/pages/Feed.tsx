import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CommentCard } from "@/components/CommentCard";
import { AlbumCard } from "@/components/AlbumCard";
import { mockAlbums, getEnrichedRatings } from "@/data/mockData";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const newReleases = mockAlbums.filter((a) => a.isNewRelease);
const trendingAlbums = mockAlbums.filter((a) => !a.isNewRelease).slice(0, 5);

const Index = () => {
  const enrichedRatings = getEnrichedRatings();
  const [takesFilter, setTakesFilter] = useState("friends");

  // Mock: "Top Takes" sorted by likes, "Friends" chronological
  const filteredTakes =
    takesFilter === "top"
      ? [...enrichedRatings].sort((a, b) => b.likes - a.likes)
      : enrichedRatings;

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
            Welcome back, <span className="text-gradient">Alex</span>
          </h1>
          <p className="text-muted-foreground">
            See what people are saying about albums and join the conversation.
          </p>
        </section>

        {/* 1. Newly Released Albums */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Newly Released</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
            {newReleases.map((album, index) => (
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

        {/* 2. Trending / Albums People Are Talking About */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Albums People Are Talking About</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
            {trendingAlbums.map((album, index) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                title={album.title}
                artist={album.artist}
                coverUrl={album.coverUrl}
                rating={album.averageRating}
                releaseYear={album.releaseYear}
                showRating={false}
                size="md"
                className="shrink-0"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        </section>

        {/* 3. Takes Feed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold">Takes</h2>
            <ToggleGroup
              type="single"
              value={takesFilter}
              onValueChange={(v) => v && setTakesFilter(v)}
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
            </ToggleGroup>
          </div>
          <div className="space-y-4">
            {filteredTakes.map((rating, index) => (
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
