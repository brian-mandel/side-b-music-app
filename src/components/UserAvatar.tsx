 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { cn } from "@/lib/utils";
 
 interface UserAvatarProps {
   name: string;
   image?: string;
   size?: "sm" | "md" | "lg";
   className?: string;
 }
 
 const sizeClasses = {
   sm: "w-8 h-8 text-xs",
   md: "w-10 h-10 text-sm",
   lg: "w-14 h-14 text-lg",
 };
 
 export function UserAvatar({ name, image, size = "md", className }: UserAvatarProps) {
   const initials = name
     .split(" ")
     .map((n) => n[0])
     .join("")
     .toUpperCase()
     .slice(0, 2);
 
   return (
     <Avatar className={cn(sizeClasses[size], "ring-2 ring-border", className)}>
       <AvatarImage src={image} alt={name} />
       <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
         {initials}
       </AvatarFallback>
     </Avatar>
   );
 }