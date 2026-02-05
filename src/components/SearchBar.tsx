 import { Search } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { cn } from "@/lib/utils";
 import { useState } from "react";
 
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
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     onSearch?.(query);
   };
 
   return (
     <form onSubmit={handleSubmit} className={cn("relative", className)}>
       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
       <Input
         type="search"
         placeholder={placeholder}
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         className="pl-10 bg-secondary border-transparent focus:border-primary/50 focus:ring-primary/20"
       />
     </form>
   );
 }