import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Rental from "@/pages/Rental";
import IdFree from "@/pages/IdFree";
import Ipa from "@/pages/Ipa";
import Admin from "@/pages/Admin";
import Maintenance from "@/pages/Maintenance";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import type { SiteSettings } from "@shared/schema";

function MaintenanceWrapper() {
  const [location, setLocation] = useLocation();
  
  const { data: settings } = useQuery<SiteSettings>({
    queryKey: ["/api/settings"],
    staleTime: 30000, // Check every 30 seconds
  });

  useEffect(() => {
    if (settings?.maintenanceMode && location !== "/admin" && location !== "/maintenance") {
      setLocation("/maintenance");
    } else if (!settings?.maintenanceMode && location === "/maintenance") {
      setLocation("/");
    }
  }, [settings?.maintenanceMode, location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Rental} />
      <Route path="/modules" component={Home} />
      <Route path="/idfree" component={IdFree} />
      <Route path="/ipa" component={Ipa} />
      <Route path="/admin" component={Admin} />
      <Route path="/maintenance" component={Maintenance} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MaintenanceWrapper />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
