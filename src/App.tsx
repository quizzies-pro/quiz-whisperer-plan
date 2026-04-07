import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import QuizStep from "./pages/QuizStep";
import Faro from "./pages/Faro";
import NotFound from "./pages/NotFound";

const stepRoutes = [
  { path: "/quiz/step/1", label: "1-VSL" },
  { path: "/quiz/step/2", label: "2-Welcome" },
  { path: "/quiz/step/3", label: "3-Interesse" },
  { path: "/quiz/step/4", label: "4-Nome" },
  { path: "/quiz/step/5", label: "5-Email" },
  { path: "/quiz/step/6", label: "6-WhatsApp" },
  { path: "/quiz/step/7", label: "7-Interstitial" },
  { path: "/quiz/step/8", label: "8-Investimento" },
  { path: "/quiz/step/9", label: "9-Resultado" },
];

// Used by Lovable to show routes in the preview navigation
void stepRoutes;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/faro" element={<Faro />} />
          <Route path="/quiz/step/1" element={<QuizStep />} />
          <Route path="/quiz/step/2" element={<QuizStep />} />
          <Route path="/quiz/step/3" element={<QuizStep />} />
          <Route path="/quiz/step/4" element={<QuizStep />} />
          <Route path="/quiz/step/5" element={<QuizStep />} />
          <Route path="/quiz/step/6" element={<QuizStep />} />
          <Route path="/quiz/step/7" element={<QuizStep />} />
          <Route path="/quiz/step/8" element={<QuizStep />} />
          <Route path="/quiz/step/9" element={<QuizStep />} />
          <Route path="/quiz/step/:id" element={<QuizStep />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
