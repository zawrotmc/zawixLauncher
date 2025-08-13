import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useGeolocation } from "@/hooks/use-geolocation";
import EnglishHome from "@/pages/en";
import PolishHome from "@/pages/pl";
import NotFound from "@/pages/not-found";

function GeoRedirect() {
  const [location, setLocation] = useLocation();
  const { country, isLoading } = useGeolocation();

  useEffect(() => {
    // Only redirect if we're on the root path and geolocation is complete
    if (location === "/" && !isLoading && country) {
      // Polish users get Polish version, everyone else gets English
      if (country === 'pl') {
        setLocation('/pl');
      } else {
        setLocation('/en');
      }
    }
  }, [location, country, isLoading, setLocation]);

  // Show loading or default content while detecting location
  if (location === "/" && isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-[var(--neon-cyan)] neon-text animate-neon-flicker mb-4">
            zawix<span className="text-[var(--neon-pink)]">Launcher</span>
          </div>
          <p className="text-gray-400">Detecting your location...</p>
        </div>
      </div>
    );
  }

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={GeoRedirect} />
      <Route path="/pl" component={PolishHome} />
      <Route path="/en" component={EnglishHome} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
