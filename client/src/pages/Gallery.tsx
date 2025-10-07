import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Photos" },
    { id: "programs", name: "Programs" },
    { id: "events", name: "Events" },
    { id: "community", name: "Community" },
    { id: "education", name: "Education" }
  ];

  const galleryImages = [
    {
      id: 1,
      category: "programs",
      title: "Leadership Workshop",
      description: "Youth participating in leadership development training",
      icon: "fas fa-users-cog",
      color: "from-secondary to-blue-800"
    },
    {
      id: 2,
      category: "community",
      title: "Community Outreach",
      description: "Team engaging with local communities",
      icon: "fas fa-hands-helping",
      color: "from-accent to-green-700"
    },
    {
      id: 3,
      category: "education",
      title: "School Supplies Distribution",
      description: "Providing educational materials to students",
      icon: "fas fa-book-reader",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      category: "events",
      title: "Annual Youth Summit",
      description: "Gathering of young leaders from across Liberia",
      icon: "fas fa-calendar-alt",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 5,
      category: "programs",
      title: "Empower Her Session",
      description: "Girls participating in leadership training",
      icon: "fas fa-female",
      color: "from-pink-500 to-purple-600"
    },
    {
      id: 6,
      category: "community",
      title: "Food Security Initiative",
      description: "Community garden project launch",
      icon: "fas fa-seedling",
      color: "from-green-600 to-emerald-700"
    },
    {
      id: 7,
      category: "education",
      title: "Mentorship Program",
      description: "Mentors and mentees in study session",
      icon: "fas fa-user-graduate",
      color: "from-indigo-500 to-blue-700"
    },
    {
      id: 8,
      category: "events",
      title: "Policy Advocacy Training",
      description: "Youth learning advocacy and civic engagement",
      icon: "fas fa-balance-scale",
      color: "from-indigo-600 to-purple-700"
    },
    {
      id: 9,
      category: "programs",
      title: "Skills Development",
      description: "Vocational training workshop in progress",
      icon: "fas fa-tools",
      color: "from-orange-500 to-red-600"
    },
    {
      id: 10,
      category: "community",
      title: "Health Awareness Campaign",
      description: "Community health education session",
      icon: "fas fa-heartbeat",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 11,
      category: "events",
      title: "Volunteer Appreciation Day",
      description: "Celebrating our dedicated volunteers",
      icon: "fas fa-award",
      color: "from-yellow-600 to-orange-600"
    },
    {
      id: 12,
      category: "education",
      title: "Reading Program",
      description: "Children enjoying new books and learning materials",
      icon: "fas fa-book-open",
      color: "from-blue-500 to-cyan-600"
    }
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="py-20 bg-muted min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-testid="gallery-header">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Photo Gallery</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Our Impact in Pictures
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore moments from our programs, events, and community initiatives that showcase the transformation happening across Liberia.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12" data-testid="gallery-filters">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={selectedCategory === category.id ? "bg-secondary text-secondary-foreground" : ""}
              data-testid={`filter-${category.id}`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" data-testid="gallery-grid">
          {filteredImages.map((image) => (
            <Card key={image.id} className="overflow-hidden card-hover cursor-pointer" data-testid={`gallery-item-${image.id}`}>
              <div className={`h-64 bg-gradient-to-br ${image.color} flex items-center justify-center`}>
                <i className={`${image.icon} text-white text-6xl`}></i>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-2">{image.title}</h3>
                <p className="text-muted-foreground text-sm">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-secondary to-accent text-white rounded-2xl p-8 md:p-12 mb-16" data-testid="gallery-stats">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">Gallery by Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-sm text-white/80">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm text-white/80">Events Documented</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-sm text-white/80">Communities Featured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3 Years</div>
              <div className="text-sm text-white/80">Of Impact Captured</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-background rounded-2xl p-8 md:p-12" data-testid="gallery-cta">
          <h2 className="font-heading font-bold text-3xl mb-4">Be Part of Our Story</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            These images represent real lives transformed. Join us in creating more success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 font-semibold" data-testid="volunteer-cta-button">
                <i className="fas fa-hands-helping mr-2"></i>
                Volunteer With Us
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" className="px-8 py-3 font-semibold" data-testid="donate-cta-button">
                <i className="fas fa-heart mr-2"></i>
                Support Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
