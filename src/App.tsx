
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import TestsPage from "./pages/TestsPage";
import DemoPage from "./pages/DemoPage";
import NotFound from "./pages/NotFound";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/demo" element={<DemoPage />} /> {/* Demo accessible without login */}
              
              {/* Protected routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects" 
                  element={
                    <ProtectedRoute>
                      <ProjectsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/projects/new" 
                  element={
                    <ProtectedRoute>
                      <CreateProjectPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/tests" 
                  element={
                    <ProtectedRoute>
                      <TestsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
