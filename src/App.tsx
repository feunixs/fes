
// React & React Router imports
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Component UI imports
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages imports
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomersPage from "./pages/master/CustomersPage";
import PurchaseOrdersPage from "./pages/purchased/PurchaseOrdersPage";
import NotFound from "./pages/NotFound";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Styles
import './App.css';
import './custom-styles.css';
import "./components/ui/parallax-transition.css";

const queryClient = new QueryClient();

/**
 * Page transition wrapper component
 * Handles smooth transitions between routes
 */
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  
  useEffect(() => {
    // Skip transition animation on initial page load
    if (location.pathname === displayLocation.pathname) return;
    
    // Fade out current page
    setTransitionStage("fadeOut");
    
    // After animation completes, update location and fade in new page
    const timeout = setTimeout(() => {
      setDisplayLocation(location);
      setTransitionStage("fadeIn");
    }, 300); // Duration should match CSS transition
    
    return () => clearTimeout(timeout);
  }, [location, displayLocation]);
  
  return (
    <div className={`page-transition ${transitionStage}`}>
      {children}
    </div>
  );
};

/**
 * Application routes configuration
 */
const AppRoutes = () => (
  <Routes>
    {/* Authentication */}
    <Route path="/login" element={<Login />} />
      
    {/* Main dashboard */}
    <Route path="/dashboard" element={<Dashboard />} />
      
    {/* Master Data */}
    <Route path="/master/customers" element={<CustomersPage />} />
      
    {/* Purchasing */}
    <Route path="/purchased/orders" element={<PurchaseOrdersPage />} />
      
    {/* Default redirect */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
    {/* 404 catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

/**
 * Root application component
 * Provides necessary context providers and routing setup
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTransitionWrapper>
          <AppRoutes />
        </PageTransitionWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
