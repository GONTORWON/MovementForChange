import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
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
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
