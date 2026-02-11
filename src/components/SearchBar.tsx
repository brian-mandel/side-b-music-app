import { Search, Star, X } from "lucide-react";
import { AlbumCover } from "./AlbumCover";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 import { useState, useRef, useEffect } from "react";
 import { mockAlbums, Album } from "@/data/mockData";
 import { useRatingDialog } from "@/hooks/useRatingDialog";
 import { Link } from "react-router-dom";
 
 interface SearchBarProps {
   placeholder?: string;
   onSearch?: (query: string) => void;
   className?: string;
 }
 
 export function SearchBar({
   placeholder = "Search albums, artists...",
   onSearch,
   className,
 }: SearchBarProps) {
   const [query, setQuery] = useState("");
   const [isOpen, setIsOpen] = useState(false);
   const [results, setResults] = useState<Album[]>([]);
   const containerRef = useRef<HTMLDivElement>(null);
   const { openRatingDialog } = useRatingDialog();
 
   useEffect(() => {
     if (query.length > 0) {
       const filtered = mockAlbums.filter(
         (album) =>
           album.title.toLowerCase().includes(query.toLowerCase()) ||
           album.artist.toLowerCase().includes(query.toLowerCase())
       );
       setResults(filtered);
       setIsOpen(true);
     } else {
       setResults([]);
       setIsOpen(false);
     }
   }, [query]);
 
   useEffect(() => {
     const handleClickOutside = (e: MouseEvent) => {
       if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
         setIsOpen(false);
       }
     };
     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);
 
   const handleRateClick = (album: Album, e: React.MouseEvent) => {
     e.preventDefault();
     e.stopPropagation();
     openRatingDialog(album);
     setIsOpen(false);
     setQuery("");
   };
 
   const clearSearch = () => {
     setQuery("");
     setResults([]);
     setIsOpen(false);
   };
 
   return (
     <div ref={containerRef} className={cn("relative", className)}>
       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
       <Input
         type="text"
         placeholder={placeholder}
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         onFocus={() => query.length > 0 && setIsOpen(true)}
         className="pl-10 pr-8 text-white placeholder:text-white/60 border-transparent focus:border-primary/50 focus:ring-primary/20" style={{ backgroundColor: '#943b8' }}
       />
       {query && (
         <button
           type="button"
           onClick={clearSearch}
           className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
         >
           <X className="w-4 h-4" />
         </button>
       )}
 
       {/* Search Results Dropdown */}
       {isOpen && results.length > 0 && (
         <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-scale-in">
           <div className="max-h-80 overflow-y-auto">
             {results.map((album) => (
               <div
                 key={album.id}
                 className="flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors group"
               >
                 <Link
                   to={`/album/${album.id}`}
                   onClick={() => {
                     setIsOpen(false);
                     setQuery("");
                   }}
                   className="flex items-center gap-3 flex-1 min-w-0"
                 >
                    <AlbumCover
                      src={album.cover_image_url}
                      alt={album.title}
                      className="w-10 h-10 rounded"
                    />
                   <div className="flex-1 min-w-0">
                     <p className="font-medium text-sm text-foreground truncate">
                       {album.title}
                     </p>
                     <p className="text-xs text-muted-foreground truncate">
                       {album.artist} · {album.releaseYear}
                     </p>
                   </div>
                 </Link>
                 <Button
                   size="sm"
                   variant="ghost"
                   onClick={(e) => handleRateClick(album, e)}
                   className="shrink-0 gap-1 text-muted-foreground hover:text-primary hover:bg-primary/10"
                 >
                   <Star className="w-4 h-4" />
                   <span className="text-xs">Rate</span>
                 </Button>
               </div>
             ))}
           </div>
         </div>
       )}
 
       {isOpen && query.length > 0 && results.length === 0 && (
         <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg p-4 text-center z-50">
           <p className="text-sm text-muted-foreground">
             No albums found for "{query}"
           </p>
         </div>
       )}
     </div>
   );
 }