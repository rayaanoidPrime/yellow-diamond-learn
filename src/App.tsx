import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Modules from "./pages/modules/Modules";
import ModuleDetail from "./pages/modules/ModuleDetail";
import LessonDetail from "./pages/modules/LessonDetail";
import Quiz from "./pages/modules/Quiz";
import Achievements from "./pages/Achievements";
import Progress from "./pages/Progress";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import {ProgressProvider} from "./contexts/ProgressContext"
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
        <ProgressProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Module routes */}
            <Route path="/modules" element={
              <ProtectedRoute>
                <Modules />
              </ProtectedRoute>
            } />
            <Route path="/modules/:moduleId" element={
              <ProtectedRoute>
                <ModuleDetail />
              </ProtectedRoute>
            } />
            <Route path="/modules/:moduleId/lessons/:lessonId" element={
              <ProtectedRoute>
                <LessonDetail />
              </ProtectedRoute>
            } />
            <Route path="/modules/:moduleId/lessons/:lessonId/quiz" element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } />
            
            {/* Other routes */}
            <Route path="/achievements" element={
              <ProtectedRoute>
                <Achievements />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            } />
            
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ProgressProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
