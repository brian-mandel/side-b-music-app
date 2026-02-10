import { useState } from "react";
import { Plus, GripVertical, X } from "lucide-react";
import { Album, mockAlbums } from "@/data/mockData";
import { AlbumCover } from "@/components/AlbumCover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Top3AlbumsProps {
  albums: (Album | null)[];
  onUpdate?: (albums: (Album | null)[]) => void;
}

export function Top3Albums({ albums, onUpdate }: Top3AlbumsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const searchResults = searchQuery.length > 0
    ? mockAlbums.filter(
        (album) =>
          album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          album.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectAlbum = (album: Album) => {
    if (selectedSlot !== null && onUpdate) {
      const newAlbums = [...albums];
      newAlbums[selectedSlot] = album;
      onUpdate(newAlbums);
    }
    setDialogOpen(false);
    setSearchQuery("");
    setSelectedSlot(null);
  };

  const handleRemoveAlbum = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdate) {
      const newAlbums = [...albums];
      newAlbums[index] = null;
      onUpdate(newAlbums);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    if (onUpdate) {
      const newAlbums = [...albums];
      const draggedAlbum = newAlbums[draggedIndex];
      newAlbums[draggedIndex] = newAlbums[index];
      newAlbums[index] = draggedAlbum;
      onUpdate(newAlbums);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <section className="mb-8">
      <h2 className="text-lg font-display font-semibold mb-4">Top 3 Albums</h2>
      
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[0, 1, 2].map((index) => {
          const album = albums[index];
          
          return (
            <Dialog 
              key={index} 
              open={dialogOpen && selectedSlot === index}
              onOpenChange={(open) => {
                setDialogOpen(open);
                if (open) setSelectedSlot(index);
                else {
                  setSelectedSlot(null);
                  setSearchQuery("");
                }
              }}
            >
              <DialogTrigger asChild>
                <div
                  draggable={!!album}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "relative aspect-square rounded-xl border-2 border-dashed border-border cursor-pointer transition-all group overflow-hidden",
                    album 
                      ? "border-solid border-border hover:border-primary/50" 
                      : "hover:border-primary/50 hover:bg-secondary/50",
                    draggedIndex === index && "opacity-50"
                  )}
                >
                  {album ? (
                    <>
                       <AlbumCover
                         src={album.cover_image_url}
                         alt={album.title}
                         className="w-full h-full rounded-none"
                       />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                          <p className="text-white text-xs sm:text-sm font-medium truncate">
                            {album.title}
                          </p>
                          <p className="text-white/70 text-xs truncate">
                            {album.artist}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleRemoveAlbum(index, e)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute top-2 left-2 p-1 rounded bg-black/50 text-white cursor-grab">
                          <GripVertical className="w-3 h-3" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Plus className="w-6 h-6 sm:w-8 sm:h-8 mb-1" />
                      <span className="text-xs">Add album</span>
                    </div>
                  )}
                </div>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Select Album #{index + 1}</DialogTitle>
                </DialogHeader>
                
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search albums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="max-h-64 overflow-y-auto mt-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((album) => (
                      <button
                        key={album.id}
                        onClick={() => handleSelectAlbum(album)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-lg transition-colors text-left"
                      >
                         <AlbumCover
                           src={album.cover_image_url}
                           alt={album.title}
                           className="w-10 h-10 rounded"
                         />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{album.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
                        </div>
                      </button>
                    ))
                  ) : searchQuery.length > 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No albums found
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Search for an album
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </section>
  );
}
