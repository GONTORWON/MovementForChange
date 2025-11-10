import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/news-events", label: "News & Events" },
    { href: "/contact", label: "Contact" },
  ];

  const programNavItems = [
    { 
      slug: "leadership-development", 
      label: "Leadership Development",
      icon: "fas fa-users-cog",
      description: "Training future leaders"
    },
    { 
      slug: "community-engagement", 
      label: "Community Engagement",
      icon: "fas fa-hands-helping",
      description: "Grassroots outreach projects"
    },
    { 
      slug: "youth-mentorship", 
      label: "Youth Mentorship",
      icon: "fas fa-user-graduate",
      description: "Connecting youth with mentors"
    },
    { 
      slug: "educational-support", 
      label: "Educational Support",
      icon: "fas fa-book-reader",
      description: "Supporting orphans with supplies"
    },
    { 
      slug: "empower-her", 
      label: "Empower Her",
      icon: "fas fa-female",
      description: "Uplifting young girls"
    },
    { 
      slug: "policy-advocacy", 
      label: "Policy & Advocacy",
      icon: "fas fa-balance-scale",
      description: "Empowering civic engagement"
    },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className={`bg-card sticky top-0 z-50 border-b border-border ${isScrolled ? 'nav-shadow' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3" data-testid="nav-logo">
            <img 
              src="/logo.jpeg" 
              alt="MCEFL Logo" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-lg text-foreground">MCEFL</div>
              <div className="text-xs text-muted-foreground">Empowering Future Leaders</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Home */}
            <Link
              href="/"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? 'text-primary' : 'text-foreground'
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/about") ? 'text-primary' : 'text-foreground'
              }`}
              data-testid="nav-about-us"
            >
              About Us
            </Link>
            
            {/* Programs Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`font-medium bg-transparent hover:bg-transparent data-[state=open]:bg-transparent ${
                      location.startsWith('/programs') ? 'text-primary' : 'text-foreground'
                    }`}
                    data-testid="nav-programs-dropdown"
                    aria-current={location.startsWith('/programs') ? 'page' : undefined}
                  >
                    Programs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                      {programNavItems.map((program) => (
                        <NavigationMenuLink key={program.slug} asChild>
                          <Link
                            href={`/programs/${program.slug}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            data-testid={`link-program-${program.slug}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <i className={`${program.icon} text-primary text-lg`}></i>
                              </div>
                              <div>
                                <div className="text-sm font-medium leading-none mb-1">
                                  {program.label}
                                </div>
                                <p className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                                  {program.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Remaining Navigation Items */}
            {navItems.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(item.href) ? 'text-primary' : 'text-foreground'
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-muted"
              data-testid="theme-toggle"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Link href="/donate">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 btn-primary" data-testid="nav-donate-button">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-muted"
              data-testid="mobile-theme-toggle"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger" aria-label="Open navigation menu">
                  <i className="fas fa-bars text-2xl"></i>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Home */}
                  <Link
                    href="/"
                    className={`font-medium py-2 border-b border-border transition-colors hover:text-primary ${
                      isActive("/") ? 'text-primary' : 'text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                    data-testid="mobile-nav-home"
                  >
                    Home
                  </Link>

                  {/* About Us */}
                  <Link
                    href="/about"
                    className={`font-medium py-2 border-b border-border transition-colors hover:text-primary ${
                      isActive("/about") ? 'text-primary' : 'text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                    data-testid="mobile-nav-about-us"
                  >
                    About Us
                  </Link>
                  
                  {/* Programs Accordion for Mobile */}
                  <Accordion type="single" collapsible className="border-b border-border">
                    <AccordionItem value="programs" className="border-0">
                      <AccordionTrigger 
                        className={`py-2 font-medium hover:no-underline ${
                          location.startsWith('/programs') ? 'text-primary' : 'text-foreground'
                        }`}
                        data-testid="mobile-nav-programs"
                        aria-current={location.startsWith('/programs') ? 'page' : undefined}
                      >
                        Programs
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        <div className="flex flex-col space-y-2 pl-4">
                          {programNavItems.map((program) => (
                            <Link
                              key={program.slug}
                              href={`/programs/${program.slug}`}
                              className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setIsOpen(false)}
                              data-testid={`mobile-link-program-${program.slug}`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <i className={`${program.icon} text-primary text-sm`}></i>
                              </div>
                              <span>{program.label}</span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Remaining Navigation Items */}
                  {navItems.slice(2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`font-medium py-2 border-b border-border transition-colors hover:text-primary ${
                        isActive(item.href) ? 'text-primary' : 'text-foreground'
                      }`}
                      onClick={() => setIsOpen(false)}
                      data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4" data-testid="mobile-donate-button">
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
