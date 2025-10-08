import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Testimonials() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });

  const { data: testimonials, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/testimonials"],
  });

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('POST', '/api/testimonials', data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted for review.",
      });
      setFormData({ name: "", role: "", content: "", rating: 5 });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit testimonial",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const defaultTestimonials = [
    {
      id: "1",
      name: "Austin D.",
      role: "Parent",
      content: "Thanks to MCEFL, my daughter now has school supplies and the confidence to lead her classmates.",
      rating: 5,
      avatar: "AD"
    },
    {
      id: "2", 
      name: "Mary",
      role: "Age 12, Student",
      content: "Being an orphan was hard, but MCEFL gave me hope, books, and someone to believe in me.",
      rating: 5,
      avatar: "M"
    }
  ];

  const displayTestimonials = testimonials || defaultTestimonials;

  const videoTestimonials = [
    {
      thumbnail: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Student testimonial video",
      title: "Students Share Their Stories"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Mentor testimonial video", 
      title: "Mentors Making a Difference"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Community impact video",
      title: "Community Transformation"
    }
  ];

  if (isLoading) {
    return (
      <div className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="spinner w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" data-testid="testimonials-loading"></div>
            <p className="mt-4 text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-testid="testimonials-header">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Stories of Impact
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Hear from the families and children whose lives have been transformed through our programs.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12" data-testid="testimonials-grid">
          {displayTestimonials.map((testimonial, index) => (
            <Card key={testimonial.id || index} className="bg-card shadow-lg testimonial-card" data-testid={`testimonial-card-${index}`}>
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="fas fa-quote-left text-primary text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex text-yellow-400 mb-2">
                      {Array.from({ length: testimonial.rating || 5 }, (_, i) => (
                        <i key={i} className="fas fa-star ml-1 first:ml-0"></i>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-lg mb-6 italic leading-relaxed" data-testid={`testimonial-content-${index}`}>
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.avatar || testimonial.name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`testimonial-name-${index}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`testimonial-role-${index}`}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <Card className="bg-card mb-12" data-testid="video-testimonials-section">
          <CardContent className="p-8">
            <h3 className="font-heading font-bold text-2xl text-foreground mb-6 text-center">Video Stories</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {videoTestimonials.map((video, index) => (
                <div 
                  key={index}
                  className="relative rounded-xl overflow-hidden bg-muted aspect-video cursor-pointer hover:opacity-90 transition-all"
                  data-testid={`video-testimonial-${index}`}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.alt} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <i className="fas fa-play text-primary text-xl ml-1"></i>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold text-sm">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Quotes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-testid="impact-quotes">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <i className="fas fa-heart text-primary text-3xl mb-4"></i>
              <p className="text-foreground font-semibold mb-2">"Life-changing support"</p>
              <p className="text-sm text-muted-foreground">What families say about our programs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardContent className="p-6 text-center">
              <i className="fas fa-graduation-cap text-accent text-3xl mb-4"></i>
              <p className="text-foreground font-semibold mb-2">"Educational opportunity"</p>
              <p className="text-sm text-muted-foreground">Students gaining confidence and skills</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <CardContent className="p-6 text-center">
              <i className="fas fa-users text-secondary text-3xl mb-4"></i>
              <p className="text-foreground font-semibold mb-2">"Community transformation"</p>
              <p className="text-sm text-muted-foreground">Leaders building stronger communities</p>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Submission Form */}
        <Card className="bg-card max-w-3xl mx-auto" data-testid="testimonial-form-section">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="font-heading font-bold text-3xl mb-4 text-foreground">Share Your Story</h3>
              <p className="text-muted-foreground text-lg">
                If MCEFL has made an impact on your life or your community, we'd love to hear from you.
              </p>
            </div>
            {!showForm ? (
              <div className="text-center">
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg"
                  data-testid="show-testimonial-form-button"
                >
                  <i className="fas fa-pen mr-2"></i> Submit Your Testimonial
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-testimonial-name"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Your Role/Affiliation</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Parent, Student, Volunteer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    data-testid="input-testimonial-role"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Your Testimonial *</Label>
                  <Textarea
                    id="content"
                    rows={6}
                    placeholder="Share your experience with MCEFL..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    data-testid="input-testimonial-content"
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        data-testid={`rating-star-${star}`}
                      >
                        <i className="fas fa-star"></i>
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  * Your testimonial will be reviewed before being published on our website.
                </p>
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="flex-1"
                    data-testid="button-submit-testimonial"
                  >
                    {submitMutation.isPending ? "Submitting..." : "Submit Testimonial"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    data-testid="button-cancel-testimonial"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
