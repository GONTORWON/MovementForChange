import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import GetInvolved from "@/pages/GetInvolved";
import Testimonials from "@/pages/Testimonials";
import NewsEvents from "@/pages/NewsEvents";
import Contact from "@/pages/Contact";
import Donate from "@/pages/Donate";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/programs" component={Programs} />
        <Route path="/get-involved" component={GetInvolved} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/news-events" component={NewsEvents} />
        <Route path="/contact" component={Contact} />
        <Route path="/donate" component={Donate} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
