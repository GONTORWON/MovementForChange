import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertVolunteerApplicationSchema, type InsertVolunteerApplication } from "@shared/schema";

export default function GetInvolved() {
  const { toast } = useToast();
  
  const volunteerForm = useForm<InsertVolunteerApplication>({
    resolver: zodResolver(insertVolunteerApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
      availability: "",
    },
  });

  const volunteerMutation = useMutation({
    mutationFn: async (data: InsertVolunteerApplication) => {
      const response = await apiRequest("POST", "/api/volunteer", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll contact you soon.",
      });
      volunteerForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onVolunteerSubmit = (data: InsertVolunteerApplication) => {
    volunteerMutation.mutate(data);
  };

  const upcomingEvents = [
    {
      date: "15",
      month: "MAR",
      title: "Youth Leadership Summit 2024",
      description: "Join us for a transformative leadership training event.",
      location: "Monrovia, Liberia",
      category: "Leadership",
      categoryColor: "bg-accent/10 text-accent"
    },
    {
      date: "22",
      month: "MAR", 
      title: "School Supply Distribution Drive",
      description: "Help us distribute educational materials to children in need.",
      location: "Multiple Locations",
      category: "Community",
      categoryColor: "bg-secondary/10 text-secondary"
    },
    {
      date: "05",
      month: "APR",
      title: "Girls Empowerment Workshop", 
      description: "Special program focused on empowering young girls.",
      location: "Carey Street Office",
      category: "Empower Her",
      categoryColor: "bg-pink-100 text-pink-600"
    }
  ];

  return (
    <div className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16" data-testid="get-involved-header">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get Involved</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground mt-3 mb-4">
            You Can Make a Difference
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Whether through volunteering, donating, or sponsoring a child, your contribution transforms lives and builds stronger communities.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Volunteer Form */}
          <Card className="shadow-lg border border-border" data-testid="volunteer-form-card">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-hands-helping text-primary text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-foreground">Volunteer with Us</h3>
                  <p className="text-muted-foreground">Your time can transform lives</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Whether it's distributing school materials, mentoring youth, or organizing events, we need dedicated volunteers like you.
              </p>
              
              <Form {...volunteerForm}>
                <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-4">
                  <FormField
                    control={volunteerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} data-testid="volunteer-name-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={volunteerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} data-testid="volunteer-email-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={volunteerForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+231 123 456 789" {...field} data-testid="volunteer-phone-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={volunteerForm.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills & Expertise</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Teaching, Event Planning, Medical" {...field} data-testid="volunteer-skills-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={volunteerForm.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="volunteer-availability-select">
                              <SelectValue placeholder="Select your availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground btn-primary" 
                    disabled={volunteerMutation.isPending}
                    data-testid="volunteer-submit-button"
                  >
                    {volunteerMutation.isPending ? (
                      <>
                        <div className="spinner w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i> Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          {/* Donation Section */}
          <div>
            {/* Sponsor a Child */}
            <Card className="bg-gradient-to-br from-accent to-green-700 text-white mb-8" data-testid="sponsor-child-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-graduation-cap text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl">Sponsor a Child's Education</h3>
                    <p className="text-white/90">Change a life, one child at a time</p>
                  </div>
                </div>
                
                <p className="text-white/95 mb-6">
                  With your sponsorship, you can help an orphan or underprivileged child receive essential school supplies, uniforms, and educational support.
                </p>
                
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <div className="text-sm text-white/80 mb-2">Monthly Sponsorship Options:</div>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg font-semibold transition-all" data-testid="sponsor-25">
                      $25
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg font-semibold transition-all" data-testid="sponsor-50">
                      $50
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-3 rounded-lg font-semibold transition-all" data-testid="sponsor-100">
                      $100
                    </button>
                  </div>
                </div>
                
                <Link href="/donate?type=sponsor">
                  <Button className="w-full bg-white text-accent hover:shadow-lg transition-all" data-testid="sponsor-now-button">
                    <i className="fas fa-heart mr-2"></i> Sponsor Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* General Donation */}
            <Card className="shadow-lg border border-border" data-testid="donation-card">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-donate text-primary text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground">Donate Today</h3>
                    <p className="text-muted-foreground">Support our mission</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">Your donations help fund:</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start" data-testid="donation-item-1">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-muted-foreground">School kits for orphans</span>
                  </li>
                  <li className="flex items-start" data-testid="donation-item-2">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-muted-foreground">Youth leadership camps</span>
                  </li>
                  <li className="flex items-start" data-testid="donation-item-3">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-muted-foreground">Mentorship programs</span>
                  </li>
                  <li className="flex items-start" data-testid="donation-item-4">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-muted-foreground">Community empowerment drives</span>
                  </li>
                </ul>
                
                <Link href="/donate">
                  <Button className="w-full bg-primary text-primary-foreground btn-primary" data-testid="donate-now-button">
                    <i className="fas fa-lock mr-2"></i> Secure Donation
                  </Button>
                </Link>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  <i className="fas fa-shield-alt mr-1"></i> Secure payment powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Partnership Section */}
        <Card className="bg-secondary text-white mb-16" data-testid="partnership-section">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading font-bold text-3xl mb-4">Partner with Us</h3>
                <p className="text-white/90 text-lg mb-6">
                  Join hands with us as a sponsor, collaborator, or donor to amplify our impact and reach more communities.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="fas fa-star text-yellow-400 mt-1 mr-3"></i>
                    <span>Corporate sponsorship opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-star text-yellow-400 mt-1 mr-3"></i>
                    <span>Strategic partnerships for program expansion</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-star text-yellow-400 mt-1 mr-3"></i>
                    <span>Collaborative community projects</span>
                  </li>
                </ul>
                <Button className="bg-white text-secondary hover:shadow-lg transition-all" data-testid="partner-button">
                  <i className="fas fa-handshake mr-2"></i> Become a Partner
                </Button>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Partnership opportunities" 
                  className="rounded-xl shadow-xl w-full h-auto"
                  data-testid="partnership-image"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Events Calendar */}
        <Card className="bg-muted" data-testid="events-section">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Upcoming Events</h3>
                <p className="text-muted-foreground">Be a part of leadership camps, advocacy forums, and charity drives</p>
              </div>
              <Button className="bg-primary text-primary-foreground hidden sm:block" data-testid="view-all-events-button">
                View All Events
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-card hover:shadow-lg transition-all" data-testid={`event-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-primary/10 rounded-lg px-3 py-2 text-center">
                        <div className="text-2xl font-bold text-primary">{event.date}</div>
                        <div className="text-xs text-muted-foreground">{event.month}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.categoryColor}`}>
                        {event.category}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2" data-testid={`event-title-${index}`}>
                      {event.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3" data-testid={`event-description-${index}`}>
                      {event.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      <span data-testid={`event-location-${index}`}>{event.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button className="w-full bg-primary text-primary-foreground mt-6 sm:hidden" data-testid="mobile-view-all-events-button">
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
