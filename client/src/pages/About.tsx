import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const stats = [
    { number: "500+", label: "Youth Mentored", description: "Through our mentorship programs" },
    { number: "1,200+", label: "Children Supported", description: "With educational materials" },
    { number: "50+", label: "Communities", description: "Across Liberia reached" },
    { number: "100+", label: "Events Held", description: "Leadership workshops & camps" },
  ];

  const values = [
    {
      icon: "fas fa-users",
      title: "Youth Focused",
      description: "Empowering the next generation"
    },
    {
      icon: "fas fa-heart",
      title: "Compassion Driven",
      description: "Serving with care and integrity"
    },
    {
      icon: "fas fa-hands-helping",
      title: "Community Centered",
      description: "Building stronger societies together"
    },
    {
      icon: "fas fa-lightbulb",
      title: "Innovation Minded",
      description: "Creative solutions for lasting change"
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-testid="about-header">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Who We Are
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20" data-testid="about-main">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="MCEFL community engagement" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              data-testid="about-main-image"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-6" data-testid="about-main-title">
              Building Stronger Societies Through Youth Leadership
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed" data-testid="about-main-description-1">
              Movement for Change and Empowering Future Leaders (MCEFL) is a community-based organization dedicated to building stronger societies through youth leadership, social empowerment, and compassion-driven action.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed" data-testid="about-main-description-2">
              We serve youth, orphans, and underprivileged children by providing mentorship, educational resources, and platforms for civic engagement.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {values.slice(0, 2).map((value, index) => (
                <div key={index} className="flex items-start space-x-3" data-testid={`about-value-${index}`}>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className={`${value.icon} text-primary text-xl`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20" data-testid="mission-vision">
          <Card className="shadow-lg border border-border">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-bullseye text-primary text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4" data-testid="mission-title">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed" data-testid="mission-description">
                To inspire, equip, and mobilize emerging leaders—especially youth from underserved backgrounds—to drive sustainable change in their communities.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border border-border">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <i className="fas fa-eye text-accent text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4" data-testid="vision-title">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed" data-testid="vision-description">
                A world where every child, regardless of background, has access to education, mentorship, and the opportunity to lead with purpose.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="mb-20" data-testid="values-section">
          <div className="text-center mb-12">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">Our Values</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide our work and shape our approach to community empowerment.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg border border-border card-hover" data-testid={`value-card-${index}`}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${value.icon} text-primary text-2xl`}></i>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-foreground mb-2">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Leadership Structure */}
        <div className="mb-20" data-testid="leadership-section">
          <div className="text-center mb-12">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">Our Leadership</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Meet the dedicated team leading MCEFL's mission to empower youth and build stronger communities.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Samuel K. Johnson",
                position: "Executive Director",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "With over 15 years of experience in youth development, Samuel leads MCEFL's strategic vision and program implementation across Liberia.",
                email: "sjohnson@mcefl.org"
              },
              {
                name: "Mary T. Williams",
                position: "Program Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "Mary oversees all programs including the Empower Her initiative, ensuring quality delivery and measurable impact in communities.",
                email: "mwilliams@mcefl.org"
              },
              {
                name: "James B. Cooper",
                position: "Finance Director",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "James manages financial operations and ensures transparent resource allocation to maximize impact for the communities we serve.",
                email: "jcooper@mcefl.org"
              },
              {
                name: "Grace M. Harris",
                position: "Community Outreach Coordinator",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "Grace builds and maintains relationships with local communities, ensuring our programs are responsive to their needs and aspirations.",
                email: "gharris@mcefl.org"
              },
              {
                name: "Emmanuel D. Roberts",
                position: "Youth Engagement Manager",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "Emmanuel coordinates youth programs and mentorship initiatives, creating opportunities for young leaders to develop their skills.",
                email: "eroberts@mcefl.org"
              },
              {
                name: "Linda S. Thompson",
                position: "Education & Training Specialist",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "Linda designs and implements educational programs, workshops, and training sessions that equip youth with essential life and leadership skills.",
                email: "lthompson@mcefl.org"
              }
            ].map((leader, index) => (
              <Card key={index} className="shadow-lg border border-border card-hover overflow-hidden" data-testid={`leader-card-${index}`}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    data-testid={`leader-image-${index}`}
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="font-heading font-bold text-xl text-foreground mb-1" data-testid={`leader-name-${index}`}>
                    {leader.name}
                  </h4>
                  <p className="text-primary font-semibold mb-3" data-testid={`leader-position-${index}`}>
                    {leader.position}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed" data-testid={`leader-bio-${index}`}>
                    {leader.bio}
                  </p>
                  <a 
                    href={`mailto:${leader.email}`} 
                    className="text-secondary hover:text-secondary/80 text-sm font-medium transition-colors"
                    data-testid={`leader-email-${index}`}
                  >
                    {leader.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white" data-testid="impact-stats">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-center mb-12">Our Impact</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`impact-stat-${index}`}>
                <div className="text-5xl font-heading font-bold mb-2">{stat.number}</div>
                <div className="text-white/90 font-semibold mb-1">{stat.label}</div>
                <p className="text-sm text-white/75">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
