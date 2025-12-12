import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";
import ProjectDetail from "./pages/ProjectDetail";
import RequirementDetail from "./pages/RequirementDetail";
import DeletedProjects from "./pages/DeletedProjects";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProjectProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="/project/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
              <Route path="/project/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
              <Route path="/project/:id/edit" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
              <Route path="/project/:projectId/requirement/:requirementId" element={<ProtectedRoute><RequirementDetail /></ProtectedRoute>} />
              <Route path="/deleted" element={<ProtectedRoute><DeletedProjects /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProjectProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
