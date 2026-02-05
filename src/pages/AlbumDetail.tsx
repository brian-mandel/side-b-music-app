 import { useParams, Link } from "react-router-dom";
 import { AppLayout } from "@/components/layout/AppLayout";
 import { RatingStars } from "@/components/RatingStars";
 import { CommentCard } from "@/components/CommentCard";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Textarea } from "@/components/ui/textarea";
 import { ArrowLeft, Share2, Bookmark, Play } from "lucide-react";
 import { getAlbumById, mockRatings, getUserById } from "@/data/mockData";
 import { useState } from "react";
 
 const AlbumDetail = () => {
   const { id } = useParams<{ id: string }>();
   const album = getAlbumById(id || "1");
   const [userRating, setUserRating] = useState(0);
   const [comment, setComment] = useState("");
 
   if (!album) {
     return (
       <AppLayout>
         <div className="text-center py-20">
           <p className="text-muted-foreground">Album not found</p>
         </div>
       </AppLayout>
     );
   }
 
   const albumRatings = mockRatings
     .filter((r) => r.albumId === id)
     .map((r) => ({ ...r, user: getUserById(r.userId)! }));
 
   return (
     <AppLayout>
       <div className="max-w-4xl mx-auto pb-20 lg:pb-0">
         {/* Back Button */}
         <Link
           to="/"
           className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
         >
           <ArrowLeft className="w-4 h-4" />
           Back
         </Link>
 
         {/* Album Header */}
         <div className="flex flex-col md:flex-row gap-6 mb-8">
           <div className="shrink-0">
             <img
               src={album.coverUrl}
               alt={album.title}
               className="w-full md:w-64 h-auto md:h-64 rounded-xl object-cover shadow-lg"
             />
           </div>
 
           <div className="flex-1">
             <div className="flex flex-wrap gap-2 mb-3">
               {album.genre.map((g) => (
                 <Badge key={g} variant="secondary" className="text-xs">
                   {g}
                 </Badge>
               ))}
             </div>
 
             <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
               {album.title}
             </h1>
             <p className="text-xl text-muted-foreground mb-4">
               {album.artist} · {album.releaseYear}
             </p>
 
             <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-2">
                 <RatingStars rating={album.averageRating} size="lg" />
                 <span className="text-2xl font-bold text-gradient">
                   {album.averageRating.toFixed(1)}
                 </span>
               </div>
               <span className="text-sm text-muted-foreground">
                 {album.ratingsCount.toLocaleString()} ratings
               </span>
             </div>
 
             <div className="flex flex-wrap gap-3">
               <Button className="gap-2 bg-gradient-warm text-primary-foreground hover:opacity-90">
                 <Play className="w-4 h-4" />
                 Listen on Spotify
               </Button>
               <Button variant="secondary" size="icon">
                 <Bookmark className="w-4 h-4" />
               </Button>
               <Button variant="secondary" size="icon">
                 <Share2 className="w-4 h-4" />
               </Button>
             </div>
           </div>
         </div>
 
         {/* Rate This Album */}
         <section className="p-6 rounded-xl bg-card border border-border mb-8">
           <h2 className="text-lg font-display font-semibold mb-4">Rate This Album</h2>
           <div className="mb-4">
             <RatingStars
               rating={userRating}
               size="lg"
               interactive
               onRatingChange={setUserRating}
             />
           </div>
           <Textarea
             placeholder="Share your thoughts about this album..."
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             className="mb-4 bg-secondary border-transparent focus:border-primary/50"
             rows={3}
           />
           <Button
             disabled={userRating === 0}
             className="bg-gradient-warm text-primary-foreground hover:opacity-90"
           >
             Submit Rating
           </Button>
         </section>
 
         {/* Discussion */}
         <section>
           <h2 className="text-xl font-display font-semibold mb-4">
             Discussion ({albumRatings.length})
           </h2>
           <div className="space-y-4">
             {albumRatings.length > 0 ? (
               albumRatings.map((rating) => (
                 <CommentCard
                   key={rating.id}
                   id={rating.id}
                   user={{
                     id: rating.user.id,
                     name: rating.user.name,
                     avatar: rating.user.avatar,
                   }}
                   rating={rating.rating}
                   comment={rating.comment}
                   likes={rating.likes}
                   replies={rating.replies}
                   createdAt={rating.createdAt}
                   showAlbum={false}
                 />
               ))
             ) : (
               <p className="text-center text-muted-foreground py-8">
                 No reviews yet. Be the first to share your thoughts!
               </p>
             )}
           </div>
         </section>
       </div>
     </AppLayout>
   );
 };
 
 export default AlbumDetail;