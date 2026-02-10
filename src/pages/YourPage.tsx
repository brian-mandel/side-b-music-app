import { AppLayout } from "@/components/layout/AppLayout";
import { mockUsers, Album } from "@/data/mockData";
import { ProfileHeader } from "@/components/you/ProfileHeader";
import { Top3Albums } from "@/components/you/Top3Albums";
import { AddTake } from "@/components/you/AddTake";
import { RecentTakes } from "@/components/you/RecentTakes";
import { AllTakes } from "@/components/you/AllTakes";
import { useTakes } from "@/hooks/useTakes";
import { useState } from "react";

const currentUser = mockUsers[0];

export default function YourPage() {
  const { userTakes, addTake, updateTake } = useTakes();
  const [top3Albums, setTop3Albums] = useState<(Album | null)[]>([null, null, null]);

  const handleBioUpdate = (bio: string) => {
    console.log("Bio updated:", bio);
  };

  const handleTop3Update = (albums: (Album | null)[]) => {
    setTop3Albums(albums);
  };

  const handleTakeSubmitted = (albumId: string, rating: number, comment: string) => {
    addTake(albumId, rating, comment);
  };

  const handleTakeUpdate = (takeId: string, rating: number, comment: string) => {
    updateTake(takeId, rating, comment);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto pb-20 lg:pb-0">
        <ProfileHeader user={currentUser} onBioUpdate={handleBioUpdate} />
        <Top3Albums albums={top3Albums} onUpdate={handleTop3Update} />
        <AddTake onTakeSubmitted={handleTakeSubmitted} />
        <RecentTakes
          takes={userTakes}
          maxItems={5}
          onTakeUpdate={handleTakeUpdate}
        />
        <AllTakes takes={userTakes} />
      </div>
    </AppLayout>
  );
}
