import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NewsEvents() {
  const newsArticles = [
    {
      id: 1,
      title: "Leadership Workshop Empowers 100+ Youth",
      excerpt: "Our recent leadership development workshop brought together over 100 young people from across Monrovia, equipping them with essential skills for community leadership.",
      date: "February 28, 2024",
      category: "Programs",
      categoryColor: "text-primary",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Leadership workshop success"
    },
    {
      id: 2,
      title: "500 Students Receive Educational Support", 
      excerpt: "Thanks to generous donors, we distributed school supplies to 500 orphans and underprivileged children, ensuring they have the tools they need to succeed.",
      date: "February 15, 2024",
      category: "Education",
      categoryColor: "text-accent",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "School supply distribution"
    },
    {
      id: 3,
      title: "Empower Her Program Launches New Chapter",
      excerpt: "Our flagship Empower Her program has expanded to three new communities, providing young girls with mentorship, education, and leadership opportunities.",
      date: "February 1, 2024", 
      category: "Empower Her",
      categoryColor: "text-pink-600",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Empower Her program"
    }
  ];

  const upcomingEvents = [
    {
      date: "15",
      month: "March 2024",
      time: "10:00 AM - 4:00 PM",
      title: "Youth Leadership Summit 2024",
      description: "A full-day transformative leadership training event featuring keynote speakers, interactive workshops, and networking opportunities for emerging youth leaders.",
      location: "City Hall Auditorium, Monrovia",
      category: "Leadership",
      categoryColor: "bg-accent/10 text-accent"
    },
    {
      date: "22",
      month: "March 2024", 
      time: "9:00 AM - 1:00 PM",
      title: "School Supply Distribution Drive",
      description: "Join our volunteers as we distribute essential school materials, uniforms, and supplies to children in underserved communities across Monrovia.",
      location: "Multiple Locations - Check details",
      category: "Community",
      categoryColor: "bg-secondary/10 text-secondary"
    },
    {
      date: "05",
      month: "April 2024",
      time: "2:00 PM - 5:00 PM", 
      title: "Girls Empowerment Workshop",
      description: "Special workshop designed to empower young girls through leadership training, mentorship sessions, and skills development activities.",
      location: "MCEFL Office, Carey Street",
      category: "Empower Her",
      categoryColor: "bg-pink-100 text-pink-600"
    }
  ];

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Program activity",
      caption: "Leadership Training"
    },
    {
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
      alt: "Community event",
      caption: "Community Outreach"
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Educational support", 
      caption: "Educational Support"
    },
    {
      src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Mentorship program",
      caption: "Mentorship"
    },
    {
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Community event",
      caption: "Community Building"
    },
    {
      src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Workshop",
      caption: "Workshops"
    },
    {
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Success stories", 
      caption: "Success Stories"
    },
    {
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Empower Her",
      caption: "Empower Her"
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-testid="news-events-header">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">News & Events</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Stay Updated
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Latest news, program updates, and upcoming events from MCEFL.
          </p>
        </div>
        
        {/* Featured News */}
        <div className="mb-16" data-testid="news-section">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Latest Updates</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Card key={article.id} className="rounded-2xl overflow-hidden shadow-lg border border-border card-hover" data-testid={`news-article-${article.id}`}>
                <img 
                  src={article.image} 
                  alt={article.alt} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    <span data-testid={`news-date-${article.id}`}>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span className={article.categoryColor} data-testid={`news-category-${article.id}`}>
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3" data-testid={`news-title-${article.id}`}>
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`news-excerpt-${article.id}`}>
                    {article.excerpt}
                  </p>
                  <Button variant="ghost" className="text-primary font-semibold hover:underline p-0" data-testid={`news-read-more-${article.id}`}>
                    Read More <i className="fas fa-arrow-right ml-1"></i>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/news-archive">
              <Button className="bg-secondary text-secondary-foreground btn-primary" data-testid="view-all-news-button">
                View All News
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Upcoming Events Calendar */}
        <div className="mb-16" data-testid="events-section">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Upcoming Events</h2>
          
          <Card className="shadow-lg border border-border">
            <CardContent className="p-8">
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className={`flex flex-col sm:flex-row gap-6 ${index < upcomingEvents.length - 1 ? 'pb-6 border-b border-border' : ''}`} data-testid={`event-item-${index}`}>
                    <div className="flex-shrink-0 bg-primary/10 rounded-xl p-4 text-center w-32">
                      <div className="text-3xl font-bold text-primary" data-testid={`event-date-${index}`}>{event.date}</div>
                      <div className="text-sm text-muted-foreground" data-testid={`event-month-${index}`}>{event.month}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.categoryColor}`}>
                          {event.category}
                        </span>
                        <span className="text-sm text-muted-foreground" data-testid={`event-time-${index}`}>{event.time}</span>
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-2" data-testid={`event-title-${index}`}>
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-3" data-testid={`event-description-${index}`}>
                        {event.description}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        <span data-testid={`event-location-${index}`}>{event.location}</span>
                      </div>
                      <Button variant="ghost" className="text-primary font-semibold hover:underline p-0" data-testid={`event-register-${index}`}>
                        Register Now <i className="fas fa-arrow-right ml-1"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Media Gallery */}
        <div data-testid="gallery-section">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Media Gallery</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden aspect-square cursor-pointer hover:opacity-90 transition-all" data-testid={`gallery-image-${index}`}>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white text-sm font-medium" data-testid={`gallery-caption-${index}`}>
                    {image.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/gallery">
              <Button className="bg-secondary text-secondary-foreground btn-primary" data-testid="view-full-gallery-button">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
