 import { AppLayout } from "@/components/layout/AppLayout";
 import { CommentCard } from "@/components/CommentCard";
 import { AlbumCard } from "@/components/AlbumCard";
 import { mockAlbums, getEnrichedRatings } from "@/data/mockData";
 
 const Index = () => {
   const enrichedRatings = getEnrichedRatings();
 
   return (
     <AppLayout>
       <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
         {/* Welcome Section */}
         <section className="mb-8">
           <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
             Welcome back, <span className="text-gradient">Alex</span>
           </h1>
           <p className="text-muted-foreground">
             See what your friends are listening to and join the conversation.
           </p>
         </section>
 
         {/* Trending Albums */}
         <section className="mb-10">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-display font-semibold">Trending This Week</h2>
             <a href="/trending" className="text-sm text-primary hover:underline">
               See all
             </a>
           </div>
           <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide">
             {mockAlbums.slice(0, 5).map((album, index) => (
               <AlbumCard
                 key={album.id}
                 id={album.id}
                 title={album.title}
                 artist={album.artist}
                 coverUrl={album.coverUrl}
                 rating={album.averageRating}
                 releaseYear={album.releaseYear}
                 size="md"
                 className="shrink-0"
                 style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
               />
             ))}
           </div>
         </section>
 
         {/* Activity Feed */}
         <section>
           <h2 className="text-xl font-display font-semibold mb-4">Friend Activity</h2>
           <div className="space-y-4">
             {enrichedRatings.map((rating, index) => (
               <CommentCard
                 key={rating.id}
                 id={rating.id}
                 user={{
                   id: rating.user.id,
                   name: rating.user.name,
                   avatar: rating.user.avatar,
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
                 style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
               />
             ))}
           </div>
         </section>
       </div>
     </AppLayout>
   );
 };
 
 export default Index;
