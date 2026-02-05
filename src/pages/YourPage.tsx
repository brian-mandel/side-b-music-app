import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockAlbums, mockRatings, mockUsers, Album } from "@/data/mockData";
import { ProfileHeader } from "@/components/you/ProfileHeader";
import { Top3Albums } from "@/components/you/Top3Albums";
import { AddTake } from "@/components/you/AddTake";
import { RecentTakes } from "@/components/you/RecentTakes";
import { AllTakes } from "@/components/you/AllTakes";

// Get current user (user id "1" is Alex Rivera, the logged-in user)
const currentUser = mockUsers[0];

// Get current user's takes (ratings)
const getCurrentUserTakes = () => {
  return mockRatings
    .filter((r) => r.userId === "1")
    .map((rating) => ({
      ...rating,
      album: mockAlbums.find((a) => a.id === rating.albumId)!,
    }));
};

export default function YourPage() {
  // Top 3 albums state (initialize with first 3 albums as mock data)
  const [top3Albums, setTop3Albums] = useState<(Album | null)[]>([
    mockAlbums[0],
    mockAlbums[1],
    null,
  ]);

  const userTakes = getCurrentUserTakes();

  const handleBioUpdate = (bio: string) => {
    // In real app, this would save to database
    console.log("Bio updated:", bio);
  };

  const handleTop3Update = (albums: (Album | null)[]) => {
    setTop3Albums(albums);
  };

  const handleTakeSubmitted = (albumId: string, rating: number, comment: string) => {
    // In real app, this would:
    // 1. Save to database
    // 2. Create a feed item
    // 3. Contribute to album's discussion page
    console.log("Take submitted:", { albumId, rating, comment });
  };

  const handleTakeUpdate = (takeId: string, rating: number, comment: string) => {
    // In real app, this would update the database
    console.log("Take updated:", { takeId, rating, comment });
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-20 lg:pb-0">
        {/* Profile Header - Identity First */}
        <ProfileHeader user={currentUser} onBioUpdate={handleBioUpdate} />

        {/* Top 3 Albums - Taste Snapshot */}
        <Top3Albums albums={top3Albums} onUpdate={handleTop3Update} />

        {/* Add a Take - Primary Action */}
        <AddTake onTakeSubmitted={handleTakeSubmitted} />

        {/* Recent Takes */}
        <RecentTakes 
          takes={userTakes} 
          maxItems={5} 
          onTakeUpdate={handleTakeUpdate}
        />

        {/* All Takes with Filters */}
        <AllTakes takes={userTakes} />
      </div>
    </AppLayout>
  );
}
