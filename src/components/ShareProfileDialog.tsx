import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShareProfileDialogProps {
  username: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareProfileDialog({ username, open, onOpenChange }: ShareProfileDialogProps) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${window.location.origin}/user/${username}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${username}'s profile on Resonance`,
          url: profileUrl,
        });
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogDescription>
            Share your profile link with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={profileUrl}
            className="bg-secondary border-transparent text-sm"
          />
          <Button size="icon" variant="secondary" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        {typeof navigator.share === "function" && (
          <Button variant="outline" onClick={handleSystemShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share via…
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
