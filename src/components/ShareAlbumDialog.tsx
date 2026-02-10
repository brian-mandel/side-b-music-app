import { useState } from "react";
import { Copy, Check, Share2, MessageSquare } from "lucide-react";
import { AlbumCover } from "./AlbumCover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface ShareAlbumDialogProps {
  album: {
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
  };
  sharedFriendsCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareAlbumDialog({ album, sharedFriendsCount, open, onOpenChange }: ShareAlbumDialogProps) {
  const [copied, setCopied] = useState(false);
  const albumUrl = `${window.location.origin}/album/${album.id}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(albumUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${album.title} by ${album.artist} on Resonance`,
          url: albumUrl,
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
          <DialogTitle>Share Album</DialogTitle>
          <DialogDescription>
            Share this album with others.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 mb-4">
          <AlbumCover
            src={album.coverUrl}
            alt={album.title}
            className="w-16 h-16 rounded-lg"
          />
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{album.title}</p>
            <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
            {sharedFriendsCount > 0 && (
              <p className="text-xs text-primary mt-1">
                You and {sharedFriendsCount} {sharedFriendsCount === 1 ? "friend have" : "friends have"} takes on this album
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={albumUrl}
            className="bg-secondary border-transparent text-sm"
          />
          <Button size="icon" variant="secondary" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>

        <div className="flex gap-2">
          {typeof navigator.share === "function" && (
            <Button variant="outline" onClick={handleSystemShare} className="gap-2 flex-1">
              <Share2 className="w-4 h-4" />
              Share via…
            </Button>
          )}
          {sharedFriendsCount > 0 && (
            <Button variant="outline" asChild className="gap-2 flex-1">
              <Link to={`/album/${album.id}`} onClick={() => onOpenChange(false)}>
                <MessageSquare className="w-4 h-4" />
                View shared takes
              </Link>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
