import { UserAvatar } from "./UserAvatar";
import { FALLBACK_COVER } from "@/data/mockData";
 import { RatingStars } from "./RatingStars";
 import { MessageCircle, Heart } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 import { Link } from "react-router-dom";
 
 interface CommentCardProps {
   id: string;
   user: {
     id: string;
     name: string;
     avatar?: string;
   };
   album?: {
     id: string;
     title: string;
     artist: string;
     coverUrl: string;
   };
   rating: number;
   comment: string;
   likes: number;
   replies: number;
   createdAt: string;
   showAlbum?: boolean;
   className?: string;
   style?: React.CSSProperties;
 }
 
 export function CommentCard({
   id,
   user,
   album,
   rating,
   comment,
   likes,
   replies,
   createdAt,
   showAlbum = true,
   className,
   style,
 }: CommentCardProps) {
   return (
     <div
       className={cn(
         "p-4 rounded-xl bg-card border border-border/50 hover:border-border transition-colors animate-fade-in",
         className
       )}
       style={style}
     >
       <div className="flex gap-3">
         {showAlbum && album && (
           <Link to={`/album/${album.id}`} className="shrink-0">
              <img
                src={album.coverUrl}
                alt={album.title}
                className="w-16 h-16 rounded-lg object-cover album-cover"
                onError={(e) => { e.currentTarget.src = FALLBACK_COVER; }}
              />
           </Link>
         )}
         
         <div className="flex-1 min-w-0">
           <div className="flex items-start justify-between gap-2">
             <div className="flex items-center gap-2">
               <Link to={`/user/${user.id}`}>
                 <UserAvatar name={user.name} image={user.avatar} size="sm" />
               </Link>
               <div className="flex flex-col">
                 <Link
                   to={`/user/${user.id}`}
                   className="font-medium text-foreground hover:text-primary transition-colors"
                 >
                   {user.name}
                 </Link>
                 <span className="text-xs text-muted-foreground">{createdAt}</span>
               </div>
             </div>
             <RatingStars rating={rating} size="sm" />
           </div>
           
           {showAlbum && album && (
             <Link
               to={`/album/${album.id}`}
               className="block mt-1 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
             >
               {album.title} <span className="text-muted-foreground">by {album.artist}</span>
             </Link>
           )}
           
           <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
             {comment}
           </p>
           
           <div className="flex items-center gap-4 mt-3">
             <Button
               variant="ghost"
               size="sm"
               className="h-8 px-2 text-muted-foreground hover:text-primary"
             >
               <Heart className="w-4 h-4 mr-1" />
               <span className="text-xs">{likes}</span>
             </Button>
             <Button
               variant="ghost"
               size="sm"
               className="h-8 px-2 text-muted-foreground hover:text-primary"
             >
               <MessageCircle className="w-4 h-4 mr-1" />
               <span className="text-xs">{replies}</span>
             </Button>
           </div>
         </div>
       </div>
     </div>
   );
 }