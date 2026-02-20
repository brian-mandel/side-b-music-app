 import { AppLayout } from "@/components/layout/AppLayout";
 import { AlbumCard } from "@/components/AlbumCard";
 import { mockAlbums } from "@/data/mockData";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 
 const genres = ["All", "Hip-Hop", "Rock", "R&B", "Electronic", "Pop"];
 
 const Discover = () => {
   return (
     <AppLayout>
       <div className="max-w-6xl mx-auto pb-20 lg:pb-0">
         <section className="mb-8">
           <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">
             Discover
           </h1>
           <p className="text-muted-foreground">
             Explore new albums and find your next favorite.
           </p>
         </section>
 
         <Tabs defaultValue="All" className="mb-8">
           <TabsList className="bg-muted p-1 border border-border/50">
             {genres.map((genre) => (
               <TabsTrigger
                 key={genre}
                 value={genre}
                 className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
               >
                 {genre}
               </TabsTrigger>
             ))}
           </TabsList>
 
           <TabsContent value="All" className="mt-6">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
               {mockAlbums.map((album, index) => (
                 <AlbumCard
                   key={album.id}
                   id={album.id}
                   title={album.title}
                   artist={album.artist}
                    cover_image_url={album.cover_image_url}
                   rating={album.averageRating}
                   releaseYear={album.releaseYear}
                   size="md"
                   style={{ animationDelay: `${index * 0.05}s` }}
                 />
               ))}
             </div>
           </TabsContent>
 
           {genres.slice(1).map((genre) => (
             <TabsContent key={genre} value={genre} className="mt-6">
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                 {mockAlbums
                   .filter((a) => a.genre.some((g) => g.toLowerCase().includes(genre.toLowerCase())))
                   .map((album, index) => (
                     <AlbumCard
                       key={album.id}
                       id={album.id}
                       title={album.title}
                       artist={album.artist}
                       cover_image_url={album.cover_image_url}
                       rating={album.averageRating}
                       releaseYear={album.releaseYear}
                       size="md"
                       style={{ animationDelay: `${index * 0.05}s` }}
                     />
                   ))}
               </div>
             </TabsContent>
           ))}
         </Tabs>
       </div>
     </AppLayout>
   );
 };
 
 export default Discover;