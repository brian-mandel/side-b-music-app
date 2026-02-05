 import { Bell, Plus } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { SearchBar } from "@/components/SearchBar";
 import { UserAvatar } from "@/components/UserAvatar";
 import { mockUsers } from "@/data/mockData";
 
 export function Header() {
   const currentUser = mockUsers[0]; // Simulating logged-in user
 
   return (
     <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
       <div className="flex items-center justify-between h-16 px-4 lg:px-8">
         <div className="flex-1 max-w-md">
           <SearchBar className="w-full" />
         </div>
 
         <div className="flex items-center gap-2 ml-4">
           <Button
             variant="default"
             size="sm"
             className="hidden sm:flex gap-2 bg-gradient-warm hover:opacity-90 text-primary-foreground shadow-glow"
           >
             <Plus className="w-4 h-4" />
             Rate Album
           </Button>
           
           <Button variant="ghost" size="icon" className="relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
           </Button>
 
           <UserAvatar name={currentUser.name} image={currentUser.avatar} size="sm" />
         </div>
       </div>
     </header>
   );
 }