import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// QueryClientni bir marta yaratib olamiz
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Xatolik bo'lsa qayta-qayta so'rov yubormaslik uchun
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* HashRouter GitHub Pages uchun eng xavfsiz tanlov */}
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Agar kelajakda boshqa sahifalar qo'shsangiz, ularni shu yerga yozasiz */}
            
            {/* Noma'lum sahifalar uchun Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
