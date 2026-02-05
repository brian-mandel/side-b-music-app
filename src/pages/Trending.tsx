 import { AppLayout } from "@/components/layout/AppLayout";
 import { AlbumCard } from "@/components/AlbumCard";
 import { mockAlbums } from "@/data/mockData";
 import { Flame, TrendingUp, Clock } from "lucide-react";
 
 const Trending = () => {
   // Sort albums by rating count to simulate trending
   const trendingAlbums = [...mockAlbums].sort((a, b) => b.ratingsCount - a.ratingsCount);
 
   return (
     <AppLayout>
       <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
         <section className="mb-8">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center">
               <Flame className="w-5 h-5 text-primary-foreground" />
             </div>
             <h1 className="text-3xl lg:text-4xl font-display font-bold">
               Trending
             </h1>
           </div>
           <p className="text-muted-foreground">
             The most discussed albums in the community right now.
           </p>
         </section>
 
         {/* Top Album Highlight */}
         <section className="mb-10">
           <div className="relative overflow-hidden rounded-2xl bg-gradient-card p-6 lg:p-8 border border-border">
             <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
               <TrendingUp className="w-full h-full text-primary" />
             </div>
             <div className="flex flex-col md:flex-row gap-6 relative">
               <img
                 src={trendingAlbums[0].coverUrl}
                 alt={trendingAlbums[0].title}
                 className="w-40 h-40 md:w-48 md:h-48 rounded-xl object-cover shadow-glow"
               />
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                   <span className="text-xs font-bold bg-gradient-warm text-primary-foreground px-2 py-0.5 rounded-full">
                     #1 THIS WEEK
                   </span>
                 </div>
                 <h2 className="text-2xl lg:text-3xl font-display font-bold mb-1">
                   {trendingAlbums[0].title}
                 </h2>
                 <p className="text-lg text-muted-foreground mb-4">
                   {trendingAlbums[0].artist}
                 </p>
                 <div className="flex items-center gap-4 text-sm">
                   <div className="flex items-center gap-1 text-star-filled">
                     <span className="font-bold">{trendingAlbums[0].averageRating}</span>
                     <span className="text-muted-foreground">avg rating</span>
                   </div>
                   <div className="flex items-center gap-1 text-muted-foreground">
                     <Clock className="w-4 h-4" />
                     {trendingAlbums[0].ratingsCount.toLocaleString()} ratings this week
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>
 
         {/* Rest of Trending */}
         <section>
           <h2 className="text-xl font-display font-semibold mb-4">Top Albums</h2>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
             {trendingAlbums.slice(1).map((album, index) => (
               <div key={album.id} className="relative">
                 <span className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-foreground border border-border">
                   {index + 2}
                 </span>
                 <AlbumCard
                   id={album.id}
                   title={album.title}
                   artist={album.artist}
                   coverUrl={album.coverUrl}
                   rating={album.averageRating}
                   releaseYear={album.releaseYear}
                   size="md"
                   style={{ animationDelay: `${index * 0.05}s` }}
                 />
               </div>
             ))}
           </div>
         </section>
       </div>
     </AppLayout>
   );
 };
 
 export default Trending;