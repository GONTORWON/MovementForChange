import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Programs() {
  const programs = [
    {
      title: "Leadership Development Workshops",
      description: "Training future leaders in public speaking, critical thinking, and ethical decision-making through interactive workshops and hands-on experiences.",
      icon: "fas fa-users-cog",
      gradient: "from-primary to-orange-600",
      category: "Leadership",
      slug: "leadership-development"
    },
    {
      title: "Community Engagement Initiatives",
      description: "Grassroots outreach projects tackling local challenges—from food security to gender equality—creating sustainable community solutions.",
      icon: "fas fa-hands-helping",
      gradient: "from-accent to-green-700",
      category: "Community",
      slug: "community-engagement"
    },
    {
      title: "Youth Mentorship Program",
      description: "Connecting young people with experienced mentors to guide personal, academic, and professional growth through one-on-one relationships.",
      icon: "fas fa-user-graduate",
      gradient: "from-secondary to-blue-800",
      category: "Mentorship",
      slug: "youth-mentorship"
    },
    {
      title: "Educational Support for Orphans",
      description: "Providing school materials, uniforms, stationery, and basic supplies to children in need—ensuring no child is left behind due to poverty.",
      icon: "fas fa-book-reader",
      gradient: "from-yellow-500 to-orange-500",
      category: "Education",
      slug: "educational-support"
    },
    {
      title: "Empower Her",
      description: "A flagship program focused on uplifting young girls through leadership training, education access, and comprehensive empowerment initiatives.",
      icon: "fas fa-female",
      gradient: "from-pink-500 to-purple-600",
      category: "Empowerment",
      slug: "empower-her"
    },
    {
      title: "Policy & Advocacy Training",
      description: "Empowering young people to understand their rights and actively shape the policies that impact their lives and communities.",
      icon: "fas fa-balance-scale",
      gradient: "from-indigo-500 to-purple-700",
      category: "Advocacy",
      slug: "policy-advocacy"
    }
  ];

  return (
    <div className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-testid="programs-header">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Programs</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Empowering Through Action
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We offer comprehensive programs designed to develop leadership skills, provide educational support, and create lasting community impact.
          </p>
        </div>
        
        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" data-testid="programs-grid">
          {programs.map((program, index) => (
            <Card key={index} className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border card-hover" data-testid={`program-card-${index}`}>
              <div className={`h-48 bg-gradient-to-br ${program.gradient} flex items-center justify-center`}>
                <i className={`${program.icon} text-white text-6xl`}></i>
              </div>
              <CardContent className="p-6">
                <div className="mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {program.category}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3" data-testid={`program-title-${index}`}>
                  {program.title}
                </h3>
                <p className="text-muted-foreground mb-4" data-testid={`program-description-${index}`}>
                  {program.description}
                </p>
                <Link href={`/programs/${program.slug}`}>
                  <Button variant="ghost" className="text-secondary font-semibold hover:underline p-0" data-testid={`program-learn-more-${index}`}>
                    Learn More <i className="fas fa-arrow-right ml-1"></i>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Program Impact Section */}
        <div className="bg-background rounded-2xl p-8 md:p-12 mb-16" data-testid="program-impact">
          <div className="text-center mb-12">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground mb-4">Program Impact</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how our programs are making a real difference in communities across Liberia.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="impact-leadership">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-tie text-primary text-2xl"></i>
              </div>
              <div className="text-3xl font-heading font-bold text-foreground mb-2">150+</div>
              <div className="text-muted-foreground font-semibold mb-1">Leaders Trained</div>
              <p className="text-sm text-muted-foreground">Young people equipped with leadership skills</p>
            </div>
            
            <div className="text-center" data-testid="impact-education">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-accent text-2xl"></i>
              </div>
              <div className="text-3xl font-heading font-bold text-foreground mb-2">800+</div>
              <div className="text-muted-foreground font-semibold mb-1">Students Supported</div>
              <p className="text-sm text-muted-foreground">Children receiving educational assistance</p>
            </div>
            
            <div className="text-center" data-testid="impact-communities">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-home text-secondary text-2xl"></i>
              </div>
              <div className="text-3xl font-heading font-bold text-foreground mb-2">25</div>
              <div className="text-muted-foreground font-semibold mb-1">Communities</div>
              <p className="text-sm text-muted-foreground">Directly impacted by our programs</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-white" data-testid="programs-cta">
          <h3 className="font-heading font-bold text-2xl sm:text-3xl mb-4">Ready to Get Involved?</h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join us in creating lasting change. Whether through volunteering, donating, or partnering with us, your involvement makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-3 font-semibold" data-testid="programs-cta-volunteer">
              <i className="fas fa-hands-helping mr-2"></i> Volunteer Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 font-semibold" data-testid="programs-cta-donate">
              <i className="fas fa-heart mr-2"></i> Support Our Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
