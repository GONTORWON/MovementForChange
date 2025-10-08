import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, FileText, Calendar, Mail, Settings, LogOut, Heart, MessageSquare, DollarSign, BarChart, Menu, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: MessageSquare, label: "Contact Messages", path: "/admin/contacts" },
    { icon: Users, label: "Volunteer Apps", path: "/admin/volunteers" },
    { icon: Heart, label: "Testimonials", path: "/admin/testimonials" },
    { icon: FileText, label: "News & Articles", path: "/admin/news" },
    { icon: Calendar, label: "Events", path: "/admin/events" },
    { icon: Mail, label: "Newsletter", path: "/admin/newsletter" },
    { icon: BarChart, label: "Impact Metrics", path: "/admin/metrics" },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ icon: Settings, label: "Users", path: "/admin/users" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-card border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MCEFL Admin</h1>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
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
                <Link href={item.path}>
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
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Dashboard Overview</h2>
              <p className="text-muted-foreground">Welcome to the MCEFL admin portal</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent className="animate-pulse">
                      <div className="h-8 bg-muted rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card data-testid="card-contacts">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Contact Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats?.contacts || 0}</div>
                  </CardContent>
                </Card>

                <Card data-testid="card-volunteers">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Volunteer Apps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats?.volunteers || 0}</div>
                  </CardContent>
                </Card>

                <Card data-testid="card-donations">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${stats?.totalDonations?.toFixed(2) || '0.00'}</div>
                  </CardContent>
                </Card>

                <Card data-testid="card-testimonials">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats?.approvedTestimonials || 0}/{stats?.testimonials || 0}</div>
                    <p className="text-xs text-muted-foreground mt-1">Approved</p>
                  </CardContent>
                </Card>

                <Card data-testid="card-subscribers">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Newsletter Subscribers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats?.subscribers || 0}</div>
                  </CardContent>
                </Card>

                <Card data-testid="card-users">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">System Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats?.users || 0}</div>
                  </CardContent>
                </Card>

                <Card data-testid="card-donation-count">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Donation Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats?.donations || 0}</div>
                  </CardContent>
                </Card>

                <Card data-testid="card-quick-actions">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full" asChild data-testid="button-view-contacts">
                      <Link href="/admin/contacts">View Contacts</Link>
                    </Button>
                    <Button size="sm" variant="outline" className="w-full" asChild data-testid="button-add-news">
                      <Link href="/admin/news">Add News</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
