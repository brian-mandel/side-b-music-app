import { useState } from "react";
import { Share2, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/UserAvatar";
import { User } from "@/data/mockData";

interface ProfileHeaderProps {
  user: User;
  onBioUpdate?: (bio: string) => void;
}

export function ProfileHeader({ user, onBioUpdate }: ProfileHeaderProps) {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioValue, setBioValue] = useState(user.bio || "");

  const handleSaveBio = () => {
    onBioUpdate?.(bioValue);
    setIsEditingBio(false);
  };

  const handleCancelEdit = () => {
    setBioValue(user.bio || "");
    setIsEditingBio(false);
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <UserAvatar name={user.name} image={user.avatar} size="lg" />

        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-display font-bold">
            {user.name}
          </h1>
          <p className="text-muted-foreground mb-2">@{user.username}</p>
          
          {/* Editable Bio */}
          {isEditingBio ? (
            <div className="flex items-center gap-2">
              <Input
                value={bioValue}
                onChange={(e) => setBioValue(e.target.value)}
                className="text-sm bg-secondary border-transparent focus:border-primary/50"
                placeholder="Write something about yourself..."
                maxLength={150}
              />
              <Button size="icon" variant="ghost" onClick={handleSaveBio}>
                <Check className="w-4 h-4 text-primary" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleCancelEdit}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <p className="text-sm text-foreground/80">
                {user.bio || "Add a bio..."}
              </p>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsEditingBio(true)}
              >
                <Pencil className="w-3 h-3 text-muted-foreground" />
              </Button>
            </div>
          )}

          {/* Followers Only */}
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-semibold text-foreground">{user.followers.toLocaleString()}</span> followers
          </p>
        </div>

        <Button variant="secondary" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
