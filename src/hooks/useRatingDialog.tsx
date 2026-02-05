 import { useState, createContext, useContext, ReactNode } from "react";
 import { Album } from "@/data/mockData";
 import { RateAlbumDialog } from "@/components/RateAlbumDialog";
 
 interface RatingContextType {
   openRatingDialog: (album: Album) => void;
 }
 
 const RatingContext = createContext<RatingContextType | null>(null);
 
 export function RatingProvider({ children }: { children: ReactNode }) {
   const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
   const [isOpen, setIsOpen] = useState(false);
 
   const openRatingDialog = (album: Album) => {
     setSelectedAlbum(album);
     setIsOpen(true);
   };
 
   const handleSubmit = (albumId: string, rating: number, comment: string) => {
     // In real app, this would save to database
     console.log("Rating submitted:", { albumId, rating, comment });
   };
 
   return (
     <RatingContext.Provider value={{ openRatingDialog }}>
       {children}
       <RateAlbumDialog
         album={selectedAlbum}
         open={isOpen}
         onOpenChange={setIsOpen}
         onSubmit={handleSubmit}
       />
     </RatingContext.Provider>
   );
 }
 
 export function useRatingDialog() {
   const context = useContext(RatingContext);
   if (!context) {
     throw new Error("useRatingDialog must be used within RatingProvider");
   }
   return context;
 }