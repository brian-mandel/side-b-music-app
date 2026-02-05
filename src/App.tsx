import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RatingProvider } from "@/hooks/useRatingDialog";
import YourPage from "./pages/YourPage";
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import Friends from "./pages/Friends";
import AlbumDetail from "./pages/AlbumDetail";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <RatingProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<YourPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/user/:id" element={<UserProfile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
         </RatingProvider>
       </BrowserRouter>
     </TooltipProvider>
   </QueryClientProvider>
 );
 
 export default App;
