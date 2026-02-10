 import { useParams, Link } from "react-router-dom";
 import { AppLayout } from "@/components/layout/AppLayout";
 import { UserAvatar } from "@/components/UserAvatar";
 import { CommentCard } from "@/components/CommentCard";
 import { Button } from "@/components/ui/button";
 import { ArrowLeft, UserPlus, Check } from "lucide-react";
 import { getUserById, mockRatings, getAlbumById } from "@/data/mockData";
 import { useState } from "react";
 
 const UserProfile = () => {
   const { id } = useParams<{ id: string }>();
   const user = getUserById(id || "1");
   const [isFollowing, setIsFollowing] = useState(false);
 
   if (!user) {
     return (
       <AppLayout>
         <div className="text-center py-20">
           <p className="text-muted-foreground">User not found</p>
         </div>
       </AppLayout>
     );
   }
 
   const userRatings = mockRatings
     .filter((r) => r.userId === id)
     .map((r) => ({ ...r, album: getAlbumById(r.albumId)! }));
 
   return (
     <AppLayout>
       <div className="max-w-4xl mx-auto pb-20 lg:pb-0">
         <Link
           to="/"
           className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
         >
           <ArrowLeft className="w-4 h-4" />
           Back
         </Link>
 
         {/* Profile Header */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
           <UserAvatar name={user.name} image={user.avatar} size="lg" />
 
           <div className="flex-1">
             <h1 className="text-2xl lg:text-3xl font-display font-bold">
               {user.name}
             </h1>
             <p className="text-muted-foreground mb-3">@{user.username}</p>
             <p className="text-sm text-foreground/80 mb-4">{user.bio}</p>
 
             <div className="flex items-center gap-6 text-sm">
               <div>
                 <span className="font-bold text-foreground">{user.ratingsCount}</span>
                 <span className="text-muted-foreground ml-1">Takes</span>
               </div>
               <div>
                 <span className="font-bold text-foreground">{user.followers.toLocaleString()}</span>
                 <span className="text-muted-foreground ml-1">Followers</span>
               </div>
               <div>
                 <span className="font-bold text-foreground">{user.following}</span>
                 <span className="text-muted-foreground ml-1">Following</span>
               </div>
             </div>
           </div>
 
           <Button
             onClick={() => setIsFollowing(!isFollowing)}
             className={
               isFollowing
                 ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                 : "bg-gradient-warm text-primary-foreground hover:opacity-90"
             }
           >
             {isFollowing ? (
               <>
                 <Check className="w-4 h-4 mr-1" />
                 Following
               </>
             ) : (
               <>
                 <UserPlus className="w-4 h-4 mr-1" />
                 Follow
               </>
             )}
           </Button>
         </div>
 
          {/* User's Takes */}
          <section>
            <h2 className="text-xl font-display font-semibold mb-4">
              Recent Takes
            </h2>
           <div className="space-y-4">
             {userRatings.length > 0 ? (
               userRatings.map((rating) => (
                 <CommentCard
                   key={rating.id}
                   id={rating.id}
                   user={{
                     id: user.id,
                     name: user.name,
                     avatar: user.avatar,
                   }}
                   album={{
                     id: rating.album.id,
                     title: rating.album.title,
                     artist: rating.album.artist,
                     cover_image_url: rating.album.cover_image_url,
                   }}
                   rating={rating.rating}
                   comment={rating.comment}
                   likes={rating.likes}
                   replies={rating.replies}
                   createdAt={rating.createdAt}
                 />
               ))
             ) : (
               <p className="text-center text-muted-foreground py-8">
                 No takes yet.
               </p>
             )}
           </div>
         </section>
       </div>
     </AppLayout>
   );
 };
 
 export default UserProfile;