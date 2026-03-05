import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import QuizStep from "./pages/QuizStep";
import NotFound from "./pages/NotFound";

const stepRoutes = [
  { path: "/quiz/step/1", label: "1-VSL" },
  { path: "/quiz/step/2", label: "2-Nome" },
  { path: "/quiz/step/3", label: "3-Email" },
  { path: "/quiz/step/4", label: "4-WhatsApp" },
  { path: "/quiz/step/5", label: "5-Motivação" },
  { path: "/quiz/step/6", label: "6-Experiência" },
  { path: "/quiz/step/7", label: "7-Cidade" },
  { path: "/quiz/step/8", label: "8-Tempo" },
  { path: "/quiz/step/9", label: "9-Interstitial" },
  { path: "/quiz/step/10", label: "10-Investimento" },
  { path: "/quiz/step/11", label: "11-Calculadora" },
  { path: "/quiz/step/12", label: "12-Loading" },
  { path: "/quiz/step/13", label: "13-Resultado" },
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
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/step/:id" element={<QuizStep />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
