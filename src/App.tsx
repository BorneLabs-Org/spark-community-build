
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from './context/app';
import { AuthProvider } from './hooks/use-auth';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Stories from './pages/Stories';
import Profile from './pages/Profile';
import Papers from './pages/Papers';
import Saves from './pages/Saves';
import Lab from './pages/Lab';
import NotFound from "./pages/NotFound";
import ProjectView from "./components/ProjectView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/papers" element={<Papers />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/saves" element={<Saves />} />
              <Route path="/projects/:id" element={<ProjectView />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
