
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanProvider } from "@/context/PlanContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { AuthGuard } from "@/components/AuthGuard";
import { useEffect } from "react";
import Index from "./pages/Index";
import Indicators from "./pages/Indicators";
import Templates from "./pages/Templates";
import Suggestions from "./pages/Suggestions";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Set dev mode in localStorage for testing
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    if (isDev) {
      localStorage.setItem("dev_mode", "true");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <PlanProvider>
            <SubscriptionProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<Pricing />} />
                
                {/* Protected routes */}
                <Route
                  path="/indicators"
                  element={
                    <AuthGuard>
                      <Indicators />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/templates"
                  element={
                    <AuthGuard>
                      <Templates />
                    </AuthGuard>
                  }
                />
                <Route
                  path="/suggestions"
                  element={
                    <AuthGuard>
                      <Suggestions />
                    </AuthGuard>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </SubscriptionProvider>
          </PlanProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
