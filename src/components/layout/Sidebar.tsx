 import { Home, Search, User, Disc3, Users, TrendingUp } from "lucide-react";
 import { Link, useLocation } from "react-router-dom";
 import { cn } from "@/lib/utils";
 
 const navItems = [
   { icon: Home, label: "Feed", href: "/" },
   { icon: Search, label: "Discover", href: "/discover" },
   { icon: TrendingUp, label: "Trending", href: "/trending" },
   { icon: Users, label: "Friends", href: "/friends" },
   { icon: User, label: "Profile", href: "/profile" },
 ];
 
 export function Sidebar() {
   const location = useLocation();
 
   return (
     <>
       {/* Desktop Sidebar */}
       <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
         <div className="p-6">
           <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center shadow-glow">
               <Disc3 className="w-6 h-6 text-primary-foreground" />
             </div>
             <span className="text-2xl font-display font-bold text-gradient">
               Resonance
             </span>
           </Link>
         </div>
 
         <nav className="flex-1 px-4 py-2">
           <ul className="space-y-1">
             {navItems.map((item) => {
               const isActive = location.pathname === item.href;
               return (
                 <li key={item.href}>
                   <Link
                     to={item.href}
                     className={cn(
                       "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                       isActive
                         ? "bg-sidebar-accent text-sidebar-primary"
                         : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                     )}
                   >
                     <item.icon className={cn("w-5 h-5", isActive && "text-sidebar-primary")} />
                     {item.label}
                   </Link>
                 </li>
               );
             })}
           </ul>
         </nav>
 
         <div className="p-4 border-t border-sidebar-border">
           <div className="px-4 py-3 rounded-lg bg-sidebar-accent/30">
             <p className="text-xs text-muted-foreground">
               Rate albums, join the conversation
             </p>
           </div>
         </div>
       </aside>
 
       {/* Mobile Bottom Nav */}
       <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-sidebar/95 backdrop-blur-lg border-t border-sidebar-border">
         <ul className="flex items-center justify-around py-2">
           {navItems.map((item) => {
             const isActive = location.pathname === item.href;
             return (
               <li key={item.href}>
                 <Link
                   to={item.href}
                   className={cn(
                     "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
                     isActive ? "text-primary" : "text-muted-foreground"
                   )}
                 >
                   <item.icon className="w-5 h-5" />
                   <span className="text-[10px] font-medium">{item.label}</span>
                 </Link>
               </li>
             );
           })}
         </ul>
       </nav>
     </>
   );
 }