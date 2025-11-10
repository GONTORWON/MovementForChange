import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/lib/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import GetInvolved from "@/pages/GetInvolved";
import Testimonials from "@/pages/Testimonials";
import NewsEvents from "@/pages/NewsEvents";
import Contact from "@/pages/Contact";
import Donate from "@/pages/Donate";
import Partnerships from "@/pages/Partnerships";
import ShareDonation from "@/pages/ShareDonation";
import Gallery from "@/pages/Gallery";
import NewsArchive from "@/pages/NewsArchive";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminContacts from "@/pages/AdminContacts";
import AdminVolunteers from "@/pages/AdminVolunteers";
import AdminTestimonials from "@/pages/AdminTestimonials";
import AdminNews from "@/pages/AdminNews";
import AdminEvents from "@/pages/AdminEvents";
import AdminMetrics from "@/pages/AdminMetrics";
import AdminSocialMedia from "@/pages/AdminSocialMedia";
import AdminNewsletter from "@/pages/AdminNewsletter";
import AdminUsers from "@/pages/AdminUsers";
import AdminDocuments from "@/pages/AdminDocuments";
import AdminDonations from "@/pages/AdminDonations";
import AdminTasks from "@/pages/AdminTasks";
import AdminContent from "@/pages/AdminContent";
import StaffDashboard from "@/pages/StaffDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login" component={Login} />
      
      {/* Admin Routes */}
      <Route path="/admin">
        <ProtectedRoute requiredRole="staff">
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/contacts">
        <ProtectedRoute requiredRole="staff">
          <AdminContacts />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/volunteers">
        <ProtectedRoute requiredRole="staff">
          <AdminVolunteers />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/testimonials">
        <ProtectedRoute requiredRole="staff">
          <AdminTestimonials />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/news">
        <ProtectedRoute requiredRole="staff">
          <AdminNews />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/events">
        <ProtectedRoute requiredRole="staff">
          <AdminEvents />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/metrics">
        <ProtectedRoute requiredRole="staff">
          <AdminMetrics />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/social-media">
        <ProtectedRoute requiredRole="staff">
          <AdminSocialMedia />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/newsletter">
        <ProtectedRoute requiredRole="staff">
          <AdminNewsletter />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/users">
        <ProtectedRoute requiredRole="admin">
          <AdminUsers />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/documents">
        <ProtectedRoute requiredRole="staff">
          <AdminDocuments />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/donations">
        <ProtectedRoute requiredRole="staff">
          <AdminDonations />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/tasks">
        <ProtectedRoute requiredRole="admin">
          <AdminTasks />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/content">
        <ProtectedRoute requiredRole="admin">
          <AdminContent />
        </ProtectedRoute>
      </Route>

      {/* Staff Routes */}
      <Route path="/staff/dashboard">
        <ProtectedRoute requiredRole="staff">
          <StaffDashboard />
        </ProtectedRoute>
      </Route>

      {/* Public Pages with Layout */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/programs" component={Programs} />
            <Route path="/programs/:slug" component={ProgramDetail} />
            <Route path="/get-involved" component={GetInvolved} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/news-events" component={NewsEvents} />
            <Route path="/news-archive" component={NewsArchive} />
            <Route path="/contact" component={Contact} />
            <Route path="/donate" component={Donate} />
            <Route path="/partnerships" component={Partnerships} />
            <Route path="/share-donation" component={ShareDonation} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-of-service" component={TermsOfService} />
            <Route path="/cookie-policy" component={CookiePolicy} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
