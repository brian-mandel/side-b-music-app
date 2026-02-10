import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/UserAvatar";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  type: "like" | "reply" | "friend_take" | "shared";
  avatar: string;
  name: string;
  text: string;
  albumId?: string;
  time: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Maya Chen",
    text: 'liked your take on "Blonde"',
    albumId: "2",
    time: "12m ago",
  },
  {
    id: "2",
    type: "reply",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "Jordan Blake",
    text: 'replied to your take on "The Dark Side of the Moon"',
    albumId: "6",
    time: "1h ago",
  },
  {
    id: "3",
    type: "friend_take",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Maya Chen",
    text: 'posted a take on "Currents"',
    albumId: "4",
    time: "3h ago",
  },
  {
    id: "4",
    type: "like",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    name: "Jordan Blake",
    text: 'liked your take on "In Rainbows"',
    albumId: "1",
    time: "5h ago",
  },
  {
    id: "5",
    type: "shared",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    name: "Maya Chen",
    text: 'shared "Glass Hours" with you',
    albumId: "10",
    time: "1d ago",
  },
];

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const navigate = useNavigate();

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) setHasUnread(false);
  };

  const handleNotificationClick = (n: Notification) => {
    if (n.albumId) {
      navigate(`/album/${n.albumId}`);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {hasUnread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-sm">Notifications</h3>
        </div>
        <ScrollArea className="h-[320px]">
          <div className="divide-y divide-border">
            {mockNotifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className="flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors"
              >
                <UserAvatar name={n.name} image={n.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{n.name}</span>{" "}
                    <span className="text-muted-foreground">{n.text}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
