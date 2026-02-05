 import { Star } from "lucide-react";
 import { cn } from "@/lib/utils";
 import { useState } from "react";
 
 interface RatingStarsProps {
   rating: number;
   maxRating?: number;
   size?: "sm" | "md" | "lg";
   interactive?: boolean;
   onRatingChange?: (rating: number) => void;
   showValue?: boolean;
 }
 
 const sizeClasses = {
   sm: "w-3.5 h-3.5",
   md: "w-5 h-5",
   lg: "w-7 h-7",
 };
 
 export function RatingStars({
   rating,
   maxRating = 5,
   size = "md",
   interactive = false,
   onRatingChange,
   showValue = false,
 }: RatingStarsProps) {
   const [hoverRating, setHoverRating] = useState<number | null>(null);
   const displayRating = hoverRating ?? rating;
 
   const handleClick = (starIndex: number) => {
     if (interactive && onRatingChange) {
       // Allow clicking same star to toggle between full and empty
       const newRating = starIndex === rating ? starIndex - 0.5 : starIndex;
       onRatingChange(Math.max(0.5, newRating));
     }
   };
 
   return (
     <div className="flex items-center gap-1">
       <div className="flex items-center gap-0.5">
         {Array.from({ length: maxRating }).map((_, index) => {
           const starValue = index + 1;
           const isFilled = displayRating >= starValue;
           const isHalfFilled = displayRating >= starValue - 0.5 && displayRating < starValue;
 
           return (
             <button
               key={index}
               type="button"
               disabled={!interactive}
               onClick={() => handleClick(starValue)}
               onMouseEnter={() => interactive && setHoverRating(starValue)}
               onMouseLeave={() => interactive && setHoverRating(null)}
               className={cn(
                 "relative transition-all duration-150",
                 interactive && "cursor-pointer hover:scale-110 active:scale-95",
                 !interactive && "cursor-default"
               )}
             >
               <Star
                 className={cn(
                   sizeClasses[size],
                   "transition-colors duration-150",
                   isFilled || isHalfFilled ? "text-star-filled fill-star-filled" : "text-star-empty"
                 )}
               />
               {isHalfFilled && (
                 <Star
                   className={cn(
                     sizeClasses[size],
                     "absolute inset-0 text-star-filled fill-star-filled",
                     "[clip-path:inset(0_50%_0_0)]"
                   )}
                 />
               )}
             </button>
           );
         })}
       </div>
       {showValue && (
         <span className="ml-1.5 text-sm font-medium text-muted-foreground">
           {rating.toFixed(1)}
         </span>
       )}
     </div>
   );
 }