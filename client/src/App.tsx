import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Timeline from "@/pages/timeline";
import Depoimentos from "@/pages/depoimentos";
import Homenagens from "@/pages/homenagens";
import Familias from "@/pages/familias";
import Galeria from "@/pages/galeria";
import Participe from "@/pages/participe";
import Sobre from "@/pages/sobre";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/depoimentos" component={Depoimentos} />
          <Route path="/homenagens" component={Homenagens} />
          <Route path="/familias" component={Familias} />
          <Route path="/galeria" component={Galeria} />
          <Route path="/participe" component={Participe} />
          <Route path="/sobre" component={Sobre} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
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
