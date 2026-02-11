import { useState, useCallback } from "react";

export interface ThreadReply {
  id: string;
  takeId: string;
  albumId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
  likeCount: number;
}

const STORAGE_KEY = "resonance_thread_replies";
const LIKES_KEY = "resonance_thread_likes";

function loadReplies(): ThreadReply[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveReplies(replies: ThreadReply[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(replies));
}

function loadLikes(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveLikes(likes: Record<string, boolean>) {
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
}

export function useThreadReplies(takeId: string) {
  const [allReplies, setAllReplies] = useState<ThreadReply[]>(loadReplies);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>(loadLikes);

  const replies = allReplies.filter((r) => r.takeId === takeId);

  const addReply = useCallback(
    (albumId: string, userId: string, userName: string, userAvatar: string | undefined, text: string) => {
      const reply: ThreadReply = {
        id: `reply-${Date.now()}`,
        takeId,
        albumId,
        userId,
        userName,
        userAvatar,
        text,
        createdAt: "Just now",
        likeCount: 0,
      };
      setAllReplies((prev) => {
        const next = [...prev, reply];
        saveReplies(next);
        return next;
      });
    },
    [takeId]
  );

  const toggleLike = useCallback(
    (itemId: string) => {
      const isLiked = !!likedIds[itemId];
      // Update like state
      setLikedIds((prev) => {
        const next = { ...prev, [itemId]: !isLiked };
        if (!next[itemId]) delete next[itemId];
        saveLikes(next);
        return next;
      });
      // Update reply like count if it's a reply
      setAllReplies((prev) => {
        const next = prev.map((r) =>
          r.id === itemId
            ? { ...r, likeCount: r.likeCount + (isLiked ? -1 : 1) }
            : r
        );
        saveReplies(next);
        return next;
      });
    },
    [likedIds]
  );

  const isLiked = useCallback(
    (itemId: string) => !!likedIds[itemId],
    [likedIds]
  );

  return { replies, addReply, toggleLike, isLiked };
}
