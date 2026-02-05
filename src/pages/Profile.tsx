 import { AppLayout } from "@/components/layout/AppLayout";
 import { UserAvatar } from "@/components/UserAvatar";
 import { AlbumCard } from "@/components/AlbumCard";
 import { CommentCard } from "@/components/CommentCard";
 import { Button } from "@/components/ui/button";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Settings, Share2, Disc3, Star, MessageCircle } from "lucide-react";
 import { mockUsers, mockAlbums, mockRatings, getAlbumById } from "@/data/mockData";
 
 const Profile = () => {
   const user = mockUsers[0]; // Current user
   const userRatings = mockRatings
     .filter((r) => r.userId === user.id)
     .map((r) => ({ ...r, album: getAlbumById(r.albumId)! }));
 
   return (
     <AppLayout>
       <div className="max-w-4xl mx-auto pb-20 lg:pb-0">
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
                 <span className="text-muted-foreground ml-1">Ratings</span>
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
 
           <div className="flex gap-2">
             <Button variant="secondary" size="icon">
               <Share2 className="w-4 h-4" />
             </Button>
             <Button variant="secondary" size="icon">
               <Settings className="w-4 h-4" />
             </Button>
           </div>
         </div>
 
         {/* Stats Cards */}
         <div className="grid grid-cols-3 gap-4 mb-8">
           <div className="p-4 rounded-xl bg-card border border-border text-center">
             <Disc3 className="w-6 h-6 mx-auto mb-2 text-primary" />
             <div className="text-2xl font-bold">{userRatings.length}</div>
             <div className="text-xs text-muted-foreground">Albums Rated</div>
           </div>
           <div className="p-4 rounded-xl bg-card border border-border text-center">
             <Star className="w-6 h-6 mx-auto mb-2 text-star-filled" />
             <div className="text-2xl font-bold">4.5</div>
             <div className="text-xs text-muted-foreground">Avg Rating</div>
           </div>
           <div className="p-4 rounded-xl bg-card border border-border text-center">
             <MessageCircle className="w-6 h-6 mx-auto mb-2 text-accent" />
             <div className="text-2xl font-bold">89</div>
             <div className="text-xs text-muted-foreground">Comments</div>
           </div>
         </div>
 
         {/* Tabs */}
         <Tabs defaultValue="ratings">
           <TabsList className="bg-secondary/50 p-1 w-full justify-start">
             <TabsTrigger
               value="ratings"
               className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
             >
               Ratings
             </TabsTrigger>
             <TabsTrigger
               value="favorites"
               className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
             >
               Favorites
             </TabsTrigger>
             <TabsTrigger
               value="want-to-listen"
               className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
             >
               Want to Listen
             </TabsTrigger>
           </TabsList>
 
           <TabsContent value="ratings" className="mt-6">
             <div className="space-y-4">
               {userRatings.map((rating) => (
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
                     coverUrl: rating.album.coverUrl,
                   }}
                   rating={rating.rating}
                   comment={rating.comment}
                   likes={rating.likes}
                   replies={rating.replies}
                   createdAt={rating.createdAt}
                 />
               ))}
             </div>
           </TabsContent>
 
           <TabsContent value="favorites" className="mt-6">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {mockAlbums.slice(0, 4).map((album) => (
                 <AlbumCard
                   key={album.id}
                   id={album.id}
                   title={album.title}
                   artist={album.artist}
                   coverUrl={album.coverUrl}
                   userRating={5}
                   showRating={false}
                 />
               ))}
             </div>
           </TabsContent>
 
           <TabsContent value="want-to-listen" className="mt-6">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
               {mockAlbums.slice(2, 5).map((album) => (
                 <AlbumCard
                   key={album.id}
                   id={album.id}
                   title={album.title}
                   artist={album.artist}
                   coverUrl={album.coverUrl}
                   showRating={false}
                 />
               ))}
             </div>
           </TabsContent>
         </Tabs>
       </div>
     </AppLayout>
   );
 };
 
 export default Profile;