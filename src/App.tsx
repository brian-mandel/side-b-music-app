import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RatingProvider } from "@/hooks/useRatingDialog";
import { TakesProvider } from "@/hooks/useTakes";
import { ThemeProvider } from "@/hooks/useTheme";
import YourPage from "./pages/YourPage";
import Feed from "./pages/Feed";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import AlbumDetail from "./pages/AlbumDetail";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import TakeDiscussion from "./pages/TakeDiscussion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <BrowserRouter>
        <RatingProvider>
        <TakesProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<YourPage />} />
            <Route path="/home" element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/album/:id" element={<AlbumDetail />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/takes/:takeId/discussion" element={<TakeDiscussion />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TakesProvider>
         </RatingProvider>
       </BrowserRouter>
     </TooltipProvider>
    </ThemeProvider>
   </QueryClientProvider>
 );
 
 export default App;
