 import { Bell, Search } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { SearchBar } from "@/components/SearchBar";
 import { UserAvatar } from "@/components/UserAvatar";
 import { mockUsers } from "@/data/mockData";
 import { useState } from "react";
 
 export function Header() {
   const currentUser = mockUsers[0]; // Simulating logged-in user
   const [showMobileSearch, setShowMobileSearch] = useState(false);
 
   return (
     <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
       <div className="flex items-center justify-between h-16 px-4 lg:px-8">
         <div className={`flex-1 max-w-md ${showMobileSearch ? 'block' : 'hidden sm:block'}`}>
           <SearchBar className="w-full" />
         </div>
 
         <div className={`flex items-center gap-2 ml-4 ${showMobileSearch ? 'hidden' : 'flex'}`}>
           <Button
             variant="ghost"
             size="icon"
             className="sm:hidden"
             onClick={() => setShowMobileSearch(true)}
           >
             <Search className="w-5 h-5" />
           </Button>
           
           <Button variant="ghost" size="icon" className="relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
           </Button>
 
           <UserAvatar name={currentUser.name} image={currentUser.avatar} size="sm" />
         </div>
         
         {showMobileSearch && (
           <Button
             variant="ghost"
             size="sm"
             className="sm:hidden ml-2"
             onClick={() => setShowMobileSearch(false)}
           >
             Cancel
           </Button>
         )}
       </div>
     </header>
   );
 }