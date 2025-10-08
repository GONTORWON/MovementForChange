import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { data: metricsData } = useQuery({
    queryKey: ["/api/metrics"],
  });

  const stats = metricsData?.stats || [
    { number: "500+", label: "Youth Mentored", description: "Through our mentorship programs" },
    { number: "1,200+", label: "Children Supported", description: "With educational materials" },
    { number: "50+", label: "Communities Reached", description: "Across Liberia" },
    { number: "100+", label: "Leadership Events", description: "Workshops and camps held" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center" data-testid="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-8">
            <div className="inline-block w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6 overflow-hidden">
              <img src="/logo.jpeg" alt="MCEFL Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight" data-testid="hero-title">
            Inspiring Action.<br />
            <span className="text-accent">Empowering Generation.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/95 mb-4 max-w-3xl mx-auto" data-testid="hero-subtitle">
            Movement for Change and Empowering Future Leaders
          </p>
          
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto" data-testid="hero-description">
            Uplifting communities through leadership, compassion, and opportunity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/donate">
              <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg btn-primary w-full sm:w-auto" data-testid="hero-donate-button">
                <i className="fas fa-heart mr-2"></i> Donate Now
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button variant="outline" className="bg-white text-foreground px-8 py-4 rounded-lg font-semibold text-lg btn-primary w-full sm:w-auto border-white hover:bg-white/90" data-testid="hero-volunteer-button">
                <i className="fas fa-hands-helping mr-2"></i> Volunteer
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg btn-primary w-full sm:w-auto" data-testid="hero-sponsor-button">
                <i className="fas fa-graduation-cap mr-2"></i> Sponsor a Child
              </Button>
            </Link>
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <a href="#about" className="text-white text-sm" data-testid="hero-scroll-indicator">
              <i className="fas fa-chevron-down text-2xl"></i>
              <div className="mt-2">Learn More</div>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Impact Stats */}
      <section className="bg-secondary py-12" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} data-testid={`stat-${index}`}>
                <div className="stat-number font-heading font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-white text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about" className="py-20 bg-background" data-testid="about-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Who We Are</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4" data-testid="about-preview-title">
              Building Stronger Societies
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="MCEFL community engagement" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="about-preview-image"
              />
            </div>
            
            <div>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed" data-testid="about-preview-description">
                Movement for Change and Empowering Future Leaders (MCEFL) is a community-based organization dedicated to building stronger societies through youth leadership, social empowerment, and compassion-driven action.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We serve youth, orphans, and underprivileged children by providing mentorship, educational resources, and platforms for civic engagement.
              </p>
              
              <Link href="/about">
                <Button className="bg-primary text-primary-foreground btn-primary" data-testid="about-preview-learn-more">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-muted" data-testid="programs-preview-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Programs</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4" data-testid="programs-preview-title">
              Empowering Through Action
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Programs */}
            <Card className="card-hover" data-testid="program-leadership">
              <div className="h-48 bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
                <i className="fas fa-users-cog text-white text-6xl"></i>
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">Leadership Development</h3>
                <p className="text-muted-foreground mb-4">
                  Training future leaders in public speaking, critical thinking, and ethical decision-making.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover" data-testid="program-mentorship">
              <div className="h-48 bg-gradient-to-br from-secondary to-blue-800 flex items-center justify-center">
                <i className="fas fa-user-graduate text-white text-6xl"></i>
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">Youth Mentorship</h3>
                <p className="text-muted-foreground mb-4">
                  Connecting young people with experienced mentors for personal and professional growth.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover" data-testid="program-education">
              <div className="h-48 bg-gradient-to-br from-accent to-green-700 flex items-center justify-center">
                <i className="fas fa-book-reader text-white text-6xl"></i>
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">Educational Support</h3>
                <p className="text-muted-foreground mb-4">
                  Providing school materials and supplies to orphans and underprivileged children.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Link href="/programs">
              <Button className="bg-primary text-primary-foreground btn-primary" data-testid="programs-preview-view-all">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
