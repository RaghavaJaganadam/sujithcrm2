import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadsTable from "./pages/LeadsTable";
import ReportsPage from "./pages/ReportsPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admindashboard";
import SalesDashboard from "./pages/SalesDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={
            <SalesDashboard
              user={{ name: "Demo User", role: "Sales Rep" }}
              stats={{ totalLeads: 20, monthlyTarget: 80, activeSalesMembers: 3, totalRevenue: 120000, conversions: 5, newLeads: 3 }}
              leadDistribution={{ qualified: 8, proposal: 6, won: 6, total: 20 }}
              recentLeads={[
                { id: "1", company: "Acme Corp", contact: "John Doe", status: "qualified", value: 10000, lastActivity: "1 hour ago" },
                { id: "2", company: "Beta Inc", contact: "Jane Smith", status: "proposal", value: 15000, lastActivity: "2 hours ago" }
              ]}
              teamMembers={[
                { id: "1", name: "Alice Cole", role: "Senior Sales Rep", performance: 92, deals: 12, revenue: 98400 },
                { id: "2", name: "Bob Johnson", role: "Sales Rep", performance: 87, deals: 9, revenue: 76200 }
              ]}
            />
          } />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/LeadsTable" element={<LeadsTable />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
