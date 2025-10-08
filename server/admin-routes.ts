import type { Express } from "express";
import { storage } from "./storage";
import { requireAdminOrStaff, requireAdmin } from "./auth";
import { socialMediaService } from "./social-media";
import { 
  insertNewsArticleSchema, insertEventSchema, insertNewsletterSchema,
  insertDocumentSchema, insertImpactMetricSchema, insertSocialMediaSettingSchema 
} from "@shared/schema";

export function setupAdminRoutes(app: Express) {
  
  // ===== DASHBOARD STATS =====
  app.get("/api/admin/stats", requireAdminOrStaff, async (req, res) => {
    try {
      const [
        contactSubmissions,
        volunteerApplications,
        donations,
        testimonials,
        newsletters,
        users
      ] = await Promise.all([
        storage.getContactSubmissions(),
        storage.getVolunteerApplications(),
        storage.getDonations(),
        storage.getAllTestimonials(),
        storage.getNewsletters(),
        storage.getAllUsers()
      ]);

      const totalDonations = donations
        .filter(d => d.status === 'succeeded')
        .reduce((sum, d) => sum + d.amount, 0);

      res.json({
        contacts: contactSubmissions.length,
        volunteers: volunteerApplications.length,
        donations: donations.length,
        totalDonations: totalDonations / 100, // Convert cents to dollars
        testimonials: testimonials.length,
        approvedTestimonials: testimonials.filter(t => t.isApproved).length,
        subscribers: newsletters.length,
        users: users.length,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching stats: " + error.message });
    }
  });

  // ===== CONTACT SUBMISSIONS =====
  app.get("/api/admin/contacts", requireAdminOrStaff, async (req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching contacts: " + error.message });
    }
  });

  app.delete("/api/admin/contacts/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const success = await storage.deleteContactSubmission(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Contact submission not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting contact: " + error.message });
    }
  });

  // ===== VOLUNTEER APPLICATIONS =====
  app.get("/api/admin/volunteers", requireAdminOrStaff, async (req, res) => {
    try {
      const volunteers = await storage.getVolunteerApplications();
      res.json(volunteers);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching volunteers: " + error.message });
    }
  });

  app.delete("/api/admin/volunteers/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const success = await storage.deleteVolunteerApplication(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Volunteer application not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting application: " + error.message });
    }
  });

  // ===== TESTIMONIALS =====
  app.get("/api/admin/testimonials", requireAdminOrStaff, async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching testimonials: " + error.message });
    }
  });

  app.patch("/api/admin/testimonials/:id/approve", requireAdminOrStaff, async (req, res) => {
    try {
      const { isApproved } = req.body;
      const testimonial = await storage.updateTestimonialApproval(req.params.id, isApproved);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating testimonial: " + error.message });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const success = await storage.deleteTestimonial(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting testimonial: " + error.message });
    }
  });

  // ===== NEWS ARTICLES =====
  app.get("/api/admin/news", requireAdminOrStaff, async (req, res) => {
    try {
      const articles = await storage.getNewsArticles(false);
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching news: " + error.message });
    }
  });

  app.post("/api/admin/news", requireAdminOrStaff, async (req, res) => {
    try {
      const article = insertNewsArticleSchema.parse(req.body);
      const result = await storage.createNewsArticle(article);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid article data: " + error.message });
    }
  });

  app.patch("/api/admin/news/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const result = await storage.updateNewsArticle(req.params.id, req.body);
      if (!result) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating article: " + error.message });
    }
  });

  app.delete("/api/admin/news/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const success = await storage.deleteNewsArticle(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting article: " + error.message });
    }
  });

  // ===== EVENTS =====
  app.get("/api/admin/events", requireAdminOrStaff, async (req, res) => {
    try {
      const events = await storage.getEvents(false);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching events: " + error.message });
    }
  });

  app.post("/api/admin/events", requireAdminOrStaff, async (req, res) => {
    try {
      const event = insertEventSchema.parse(req.body);
      const result = await storage.createEvent(event);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid event data: " + error.message });
    }
  });

  app.patch("/api/admin/events/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const result = await storage.updateEvent(req.params.id, req.body);
      if (!result) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating event: " + error.message });
    }
  });

  app.delete("/api/admin/events/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const success = await storage.deleteEvent(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting event: " + error.message });
    }
  });

  // ===== DONATIONS =====
  app.get("/api/admin/donations", requireAdminOrStaff, async (req, res) => {
    try {
      const donations = await storage.getDonations();
      res.json(donations);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching donations: " + error.message });
    }
  });

  // ===== NEWSLETTERS =====
  app.get("/api/admin/newsletters", requireAdminOrStaff, async (req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json(newsletters);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching newsletters: " + error.message });
    }
  });

  // ===== DOCUMENTS =====
  app.get("/api/admin/documents", requireAdminOrStaff, async (req, res) => {
    try {
      const documents = await storage.getDocuments(false);
      res.json(documents);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching documents: " + error.message });
    }
  });

  app.post("/api/admin/documents", requireAdminOrStaff, async (req, res) => {
    try {
      const document = insertDocumentSchema.parse(req.body);
      const result = await storage.createDocument(document);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid document data: " + error.message });
    }
  });

  app.patch("/api/admin/documents/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const result = await storage.updateDocument(req.params.id, req.body);
      if (!result) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating document: " + error.message });
    }
  });

  app.delete("/api/admin/documents/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const success = await storage.deleteDocument(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting document: " + error.message });
    }
  });

  // ===== PROGRAM REGISTRATIONS =====
  app.get("/api/admin/registrations", requireAdminOrStaff, async (req, res) => {
    try {
      const eventId = req.query.eventId as string | undefined;
      const registrations = await storage.getProgramRegistrations(eventId);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching registrations: " + error.message });
    }
  });

  app.patch("/api/admin/registrations/:id/status", requireAdminOrStaff, async (req, res) => {
    try {
      const { status } = req.body;
      const result = await storage.updateRegistrationStatus(req.params.id, status);
      if (!result) {
        return res.status(404).json({ message: "Registration not found" });
      }
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating status: " + error.message });
    }
  });

  // ===== IMPACT METRICS =====
  app.get("/api/admin/metrics", requireAdminOrStaff, async (req, res) => {
    try {
      const metrics = await storage.getImpactMetrics();
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching metrics: " + error.message });
    }
  });

  app.post("/api/admin/metrics", requireAdminOrStaff, async (req, res) => {
    try {
      const metric = insertImpactMetricSchema.parse(req.body);
      const result = await storage.upsertImpactMetric(metric);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid metric data: " + error.message });
    }
  });

  app.patch("/api/admin/metrics/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const metric = insertImpactMetricSchema.partial().parse(req.body);
      const result = await storage.updateImpactMetric(req.params.id, metric);
      if (!result) {
        return res.status(404).json({ message: "Metric not found" });
      }
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid metric data: " + error.message });
    }
  });

  app.delete("/api/admin/metrics/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const success = await storage.deleteImpactMetric(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Metric not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: "Error deleting metric: " + error.message });
    }
  });

  // ===== USER MANAGEMENT (Admin Only) =====
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove passwords from response
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json(safeUsers);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching users: " + error.message });
    }
  });

  app.patch("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const { password, ...data } = req.body;
      const result = await storage.updateUser(req.params.id, data);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password: _, ...safeUser } = result;
      res.json(safeUser);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating user: " + error.message });
    }
  });

  // ===== SOCIAL MEDIA SETTINGS =====
  app.get("/api/admin/social-media/settings", requireAdminOrStaff, async (req, res) => {
    try {
      const settings = await storage.getSocialMediaSettings();
      res.json(settings);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching settings: " + error.message });
    }
  });

  app.post("/api/admin/social-media/settings", requireAdminOrStaff, async (req, res) => {
    try {
      const setting = insertSocialMediaSettingSchema.parse(req.body);
      const result = await storage.upsertSocialMediaSetting(setting);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: "Invalid setting data: " + error.message });
    }
  });

  // ===== SOCIAL MEDIA SHARING =====
  app.post("/api/admin/social-media/share/:type/:id", requireAdminOrStaff, async (req, res) => {
    try {
      const { type, id } = req.params;
      const { platforms } = req.body;

      let content: any;
      let contentTitle: string;

      if (type === 'news') {
        content = await storage.getNewsArticle(id);
        if (!content) {
          return res.status(404).json({ message: "News article not found" });
        }
        contentTitle = content.title;
      } else if (type === 'event') {
        content = await storage.getEvent(id);
        if (!content) {
          return res.status(404).json({ message: "Event not found" });
        }
        contentTitle = content.title;
      } else {
        return res.status(400).json({ message: "Invalid content type" });
      }

      const postContent = {
        title: content.title,
        excerpt: content.excerpt || content.description?.substring(0, 200),
        url: `${process.env.REPLIT_DOMAINS?.split(',')[0] || 'https://mcefl.replit.app'}/${type === 'news' ? 'news' : 'events'}/${id}`,
        imageUrl: content.imageUrl,
      };

      const results = await socialMediaService.postToAllEnabledPlatforms(postContent, platforms);

      // Log posts to database
      for (const result of results) {
        const post = await storage.createSocialMediaPost({
          platform: result.platform,
          contentType: type,
          contentId: id,
          contentTitle,
          status: result.success ? 'posted' : 'failed',
          postUrl: result.postId ? undefined : undefined,
          platformPostId: result.postId,
          errorMessage: result.error,
          postedAt: result.success ? new Date() : undefined,
        });

        if (result.success && post) {
          await storage.updateSocialMediaPostStatus(
            post.id,
            'posted',
            undefined,
            result.postId,
            undefined
          );
        }
      }

      res.json({ results });
    } catch (error: any) {
      res.status(500).json({ message: "Error sharing content: " + error.message });
    }
  });

  app.get("/api/admin/social-media/posts/:contentId?", requireAdminOrStaff, async (req, res) => {
    try {
      const posts = await storage.getSocialMediaPosts(req.params.contentId);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching posts: " + error.message });
    }
  });
}
