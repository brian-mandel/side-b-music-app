import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { Rating, Album, getAlbumById, mockRatings } from "@/data/mockData";

interface TakeWithAlbum extends Rating {
  album: Album;
}

interface TakesContextType {
  userTakes: TakeWithAlbum[];
  allTakes: TakeWithAlbum[];
  addTake: (albumId: string, rating: number, comment: string) => void;
  updateTake: (takeId: string, rating: number, comment: string) => void;
  deleteTake: (takeId: string) => void;
  getUserTakeForAlbum: (albumId: string) => TakeWithAlbum | undefined;
  getTakesForAlbum: (albumId: string) => TakeWithAlbum[];
}

const STORAGE_KEY = "resonance_user_takes";
const CURRENT_USER_ID = "1";

function loadUserTakes(): Rating[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveUserTakes(takes: Rating[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(takes));
}

const TakesContext = createContext<TakesContextType | null>(null);

export function TakesProvider({ children }: { children: ReactNode }) {
  const [storedTakes, setStoredTakes] = useState<Rating[]>(loadUserTakes);

  useEffect(() => {
    saveUserTakes(storedTakes);
  }, [storedTakes]);

  // Merge stored user takes with mock ratings (mock ratings for other users)
  const allTakes: TakeWithAlbum[] = (() => {
    // Other users' mock ratings
    const otherRatings = mockRatings.filter((r) => r.userId !== CURRENT_USER_ID);
    // Current user's mock ratings that haven't been overridden
    const storedAlbumIds = new Set(storedTakes.map((t) => t.albumId));
    const mockUserRatings = mockRatings.filter(
      (r) => r.userId === CURRENT_USER_ID && !storedAlbumIds.has(r.albumId)
    );
    const combined = [...otherRatings, ...mockUserRatings, ...storedTakes];
    return combined
      .map((r) => {
        const album = getAlbumById(r.albumId);
        if (!album) return null;
        return { ...r, album };
      })
      .filter(Boolean) as TakeWithAlbum[];
  })();

  const userTakes: TakeWithAlbum[] = allTakes.filter((t) => t.userId === CURRENT_USER_ID);

  const addTake = useCallback((albumId: string, rating: number, comment: string) => {
    const newTake: Rating = {
      id: `user-${Date.now()}`,
      userId: CURRENT_USER_ID,
      albumId,
      rating,
      comment,
      likes: 0,
      replies: 0,
      createdAt: "Just now",
    };
    setStoredTakes((prev) => {
      // Replace if already exists for this album
      const filtered = prev.filter((t) => t.albumId !== albumId);
      return [newTake, ...filtered];
    });
  }, []);

  const updateTake = useCallback((takeId: string, rating: number, comment: string) => {
    setStoredTakes((prev) =>
      prev.map((t) => (t.id === takeId ? { ...t, rating, comment } : t))
    );
  }, []);

  const deleteTake = useCallback((takeId: string) => {
    setStoredTakes((prev) => prev.filter((t) => t.id !== takeId));
  }, []);

  const getUserTakeForAlbum = useCallback(
    (albumId: string) => userTakes.find((t) => t.albumId === albumId),
    [userTakes]
  );

  const getTakesForAlbum = useCallback(
    (albumId: string) => allTakes.filter((t) => t.albumId === albumId),
    [allTakes]
  );

  return (
    <TakesContext.Provider
      value={{ userTakes, allTakes, addTake, updateTake, deleteTake, getUserTakeForAlbum, getTakesForAlbum }}
    >
      {children}
    </TakesContext.Provider>
  );
}

export function useTakes() {
  const ctx = useContext(TakesContext);
  if (!ctx) throw new Error("useTakes must be used within TakesProvider");
  return ctx;
}
