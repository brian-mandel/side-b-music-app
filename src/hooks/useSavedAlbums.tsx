import { useState, useCallback } from "react";

const STORAGE_KEY = "saved_album_ids";

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function writeSaved(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

export function useSavedAlbums() {
  const [savedIds, setSavedIds] = useState<string[]>(readSaved);

  const isSaved = useCallback(
    (albumId: string) => savedIds.includes(albumId),
    [savedIds]
  );

  const toggleSave = useCallback((albumId: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(albumId)
        ? prev.filter((id) => id !== albumId)
        : [...prev, albumId];
      writeSaved(next);
      return next;
    });
  }, []);

  return { savedIds, isSaved, toggleSave };
}
