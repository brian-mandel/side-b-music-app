 import { useState } from "react";
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "./RatingStars";
import { AlbumCover } from "./AlbumCover";
 import { Album } from "@/data/mockData";
 import { toast } from "sonner";
 
 interface RateAlbumDialogProps {
   album: Album | null;
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onSubmit?: (albumId: string, rating: number, comment: string) => void;
 }
 
 const MAX_COMMENT_LENGTH = 500;
 
 export function RateAlbumDialog({
   album,
   open,
   onOpenChange,
   onSubmit,
 }: RateAlbumDialogProps) {
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
 
   const handleSubmit = () => {
     if (!album || rating === 0) return;
 
     onSubmit?.(album.id, rating, comment);
     toast.success("Rating submitted!", {
       description: `You rated "${album.title}" ${rating} stars`,
     });
 
     // Reset and close
     setRating(0);
     setComment("");
     onOpenChange(false);
   };
 
   const handleClose = () => {
     setRating(0);
     setComment("");
     onOpenChange(false);
   };
 
   if (!album) return null;
 
   return (
     <Dialog open={open} onOpenChange={handleClose}>
       <DialogContent className="sm:max-w-md bg-card border-border">
         <DialogHeader>
           <DialogTitle className="font-display">Rate Album</DialogTitle>
         </DialogHeader>
 
         <div className="flex gap-4 mt-2">
            <AlbumCover
              src={album.cover_image_url}
              alt={album.title}
              className="w-20 h-20 rounded-lg shadow-md"
            />
           <div className="flex-1 min-w-0">
             <h3 className="font-semibold text-foreground truncate">
               {album.title}
             </h3>
             <p className="text-sm text-muted-foreground truncate">
               {album.artist} · {album.releaseYear}
             </p>
             <div className="mt-3">
               <RatingStars
                 rating={rating}
                 size="lg"
                 interactive
                 onRatingChange={setRating}
               />
             </div>
           </div>
         </div>
 
         <div className="mt-4">
           <label className="text-sm text-muted-foreground mb-2 block">
             Add a comment{" "}
             <span className="text-muted-foreground/60">(optional)</span>
           </label>
           <Textarea
             placeholder="Share your thoughts about this album..."
             value={comment}
             onChange={(e) =>
               setComment(e.target.value.slice(0, MAX_COMMENT_LENGTH))
             }
             className="bg-secondary border-transparent focus:border-primary/50 resize-none"
             rows={3}
           />
           <div className="flex justify-end mt-1">
             <span
               className={`text-xs ${
                 comment.length >= MAX_COMMENT_LENGTH
                   ? "text-destructive"
                   : "text-muted-foreground/60"
               }`}
             >
               {comment.length}/{MAX_COMMENT_LENGTH}
             </span>
           </div>
         </div>
 
         <div className="flex gap-3 mt-4">
           <Button
             variant="secondary"
             onClick={handleClose}
             className="flex-1"
           >
             Cancel
           </Button>
           <Button
             onClick={handleSubmit}
             disabled={rating === 0}
             className="flex-1 bg-gradient-warm text-primary-foreground hover:opacity-90"
           >
             Submit Rating
           </Button>
         </div>
       </DialogContent>
     </Dialog>
   );
 }