 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import Index from "./pages/Index";
 import Discover from "./pages/Discover";
 import Trending from "./pages/Trending";
 import Friends from "./pages/Friends";
 import Profile from "./pages/Profile";
 import AlbumDetail from "./pages/AlbumDetail";
 import UserProfile from "./pages/UserProfile";
 import NotFound from "./pages/NotFound";
 
 const queryClient = new QueryClient();
 
 const App = () => (
   <QueryClientProvider client={queryClient}>
     <TooltipProvider>
       <Toaster />
       <Sonner />
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Index />} />
           <Route path="/discover" element={<Discover />} />
           <Route path="/trending" element={<Trending />} />
           <Route path="/friends" element={<Friends />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/album/:id" element={<AlbumDetail />} />
           <Route path="/user/:id" element={<UserProfile />} />
           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     </TooltipProvider>
   </QueryClientProvider>
 );
 
 export default App;
