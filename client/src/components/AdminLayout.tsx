import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, FileText, Calendar, Mail, Settings, LogOut, Heart, MessageSquare, BarChart, Menu, Home, Share2, DollarSign, CheckSquare, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: MessageSquare, label: "Contact Messages", path: "/admin/contacts" },
    { icon: Users, label: "Volunteer Apps", path: "/admin/volunteers" },
    { icon: Heart, label: "Testimonials", path: "/admin/testimonials" },
    { icon: DollarSign, label: "Donations", path: "/admin/donations" },
    { icon: FileText, label: "News & Articles", path: "/admin/news" },
    { icon: Calendar, label: "Events", path: "/admin/events" },
    { icon: Mail, label: "Newsletter", path: "/admin/newsletter" },
    { icon: BarChart, label: "Impact Metrics", path: "/admin/metrics" },
    { icon: Share2, label: "Social Media", path: "/admin/social-media" },
  ];

  // Admin-only menu items
  if (user?.role === 'admin') {
    menuItems.push(
      { icon: CheckSquare, label: "Tasks", path: "/admin/tasks" },
      { icon: Globe, label: "Website Content", path: "/admin/content" },
      { icon: Settings, label: "Users", path: "/admin/users" }
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MCEFL Admin</h1>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu" aria-label="Toggle navigation menu">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block w-64 bg-card border-r min-h-screen fixed lg:relative z-50`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary hidden lg:block">MCEFL Admin</h1>
            <p className="text-sm text-muted-foreground mt-1 hidden lg:block">Welcome, {user?.fullName || user?.username}</p>
          </div>
          
          <nav className="px-3">
            <Button variant="ghost" className="w-full justify-start mb-2" asChild data-testid="link-home">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Website
              </Link>
            </Button>
            <Separator className="my-3" />
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start mb-1"
                asChild
                data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Link href={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
            <Separator className="my-3" />
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">{title}</h2>
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
