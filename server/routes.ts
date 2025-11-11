import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { authUtils, requireAuth, requireAdminOrStaff, requireStaff } from "./auth";
import { setupAdminRoutes } from "./admin-routes";
import { insertContactSubmissionSchema, insertVolunteerApplicationSchema, insertDonationSchema, insertTestimonialSchema, insertNewsletterSchema, insertTaskSchema } from "@shared/schema";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY not found in environment variables. Donation functionality will be limited.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
}) : null;

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ===== AUTH ROUTES =====
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await authUtils.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.userRole = user.role;

      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (error: any) {
      res.status(500).json({ message: "Login error: " + error.message });
    }
  });

  app.post("/api/auth/logout", requireAuth, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout error" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password: _, ...safeUser } = user;
      res.json(safeUser);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching user: " + error.message });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password, email, fullName } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const existing = await storage.getUserByUsername(username);
      if (existing) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const user = await authUtils.createUser(username, password, email, fullName);
      const { password: _, ...safeUser } = user;
      res.status(201).json({ user: safeUser });
    } catch (error: any) {
      res.status(500).json({ message: "Registration error: " + error.message });
    }
  });

  // Password change route for all authenticated users
  app.post("/api/auth/change-password", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValid = await authUtils.verifyPassword(currentPassword, user.password);
      if (!isValid) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      const hashedPassword = await authUtils.hashPassword(newPassword);
      await storage.updateUser(user.id, { password: hashedPassword });

      res.json({ success: true, message: "Password changed successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Error changing password: " + error.message });
    }
  });

  // Setup admin routes
  setupAdminRoutes(app);

  // ===== STAFF ROUTES =====
  app.get("/api/staff/tasks", requireStaff, async (req, res) => {
    try {
      const tasks = await storage.getTasksByUser(req.session.userId!);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching tasks: " + error.message });
    }
  });

  app.get("/api/staff/tasks/:id", requireStaff, async (req, res) => {
    try {
      const task = await storage.getTask(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      // Verify the task is assigned to the current user
      if (task.assignedToId !== req.session.userId && req.session.userRole !== 'admin') {
        return res.status(403).json({ message: "Access denied. This task is not assigned to you." });
      }
      res.json(task);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching task: " + error.message });
    }
  });

  app.patch("/api/staff/tasks/:id", requireStaff, async (req, res) => {
    try {
      const task = await storage.getTask(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      // Verify the task is assigned to the current user
      if (task.assignedToId !== req.session.userId && req.session.userRole !== 'admin') {
        return res.status(403).json({ message: "Access denied. This task is not assigned to you." });
      }

      // Staff can only update status and notes - filter and validate
      const allowedFields = ['status', 'notes'];
      const filteredData = Object.keys(req.body)
        .filter(key => allowedFields.includes(key))
        .reduce((obj: any, key) => {
          obj[key] = req.body[key];
          return obj;
        }, {});

      // Validate with Zod partial schema (only status and notes)
      const updateData = insertTaskSchema.pick({ status: true, notes: true }).partial().parse(filteredData);

      const updatedTask = await storage.updateTask(req.params.id, updateData);
      res.json(updatedTask);
    } catch (error: any) {
      res.status(400).json({ message: "Error updating task: " + error.message });
    }
  });

  // ===== PUBLIC API ROUTES =====

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const submission = insertContactSubmissionSchema.parse(req.body);
      const result = await storage.createContactSubmission(submission);
      res.json({ success: true, id: result.id });
    } catch (error: any) {
      res.status(400).json({ message: "Invalid submission: " + error.message });
    }
  });

  // Get contact submissions - REMOVED (use /api/admin/contacts with auth)

  // Volunteer application submission
  app.post("/api/volunteer", async (req, res) => {
    try {
      const application = insertVolunteerApplicationSchema.parse(req.body);
      const result = await storage.createVolunteerApplication(application);
      res.json({ success: true, id: result.id });
    } catch (error: any) {
      res.status(400).json({ message: "Invalid application: " + error.message });
    }
  });

  // Get volunteer applications - REMOVED (use /api/admin/volunteers with auth)

  // Stripe payment intent creation for donations
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe not configured. Please contact administrator." });
    }

    try {
      const { amount, donorName, donorEmail, type = "general" } = req.body;
      
      if (!amount || amount < 50) { // Minimum $0.50
        return res.status(400).json({ message: "Invalid amount. Minimum donation is $0.50" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          donorName: donorName || 'Anonymous',
          donorEmail: donorEmail || '',
          type: type
        }
      });

      // Save donation record
      const donation = await storage.createDonation({
        amount: Math.round(amount * 100),
        currency: "usd",
        donorName: donorName || null,
        donorEmail: donorEmail || null,
        stripePaymentIntentId: paymentIntent.id,
        status: "pending",
        type: type
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        donationId: donation.id
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook to handle Stripe payment updates
  app.post("/api/webhooks/stripe", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ message: "Stripe not configured" });
    }

    try {
      const sig = req.headers['stripe-signature'] as string;
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!endpointSecret) {
        console.log('Stripe webhook received but no endpoint secret configured');
        return res.status(200).send('OK');
      }

      const event = stripe.webhooks.constructEvent(req.rawBody as string | Buffer, sig, endpointSecret);

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Find and update donation status
        const donations = await storage.getDonations();
        const donation = donations.find(d => d.stripePaymentIntentId === paymentIntent.id);
        
        if (donation) {
          await storage.updateDonationStatus(donation.id, 'succeeded');
        }
      }

      res.status(200).send('OK');
    } catch (error: any) {
      console.error('Stripe webhook error:', error.message);
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });

  // Get donations - REMOVED (use /api/admin/donations with auth)

  // Get public impact metrics for homepage
  app.get("/api/metrics", async (req, res) => {
    try {
      const [
        volunteers,
        donations,
        testimonials,
        impactMetrics
      ] = await Promise.all([
        storage.getVolunteerApplications(),
        storage.getDonations(),
        storage.getAllTestimonials(),
        storage.getImpactMetrics()
      ]);

      const successfulDonations = donations.filter(d => d.status === 'succeeded');
      const childrenSupported = impactMetrics.find(m => m.metricKey === 'children_supported')?.metricValue || 0;
      const communitiesReached = impactMetrics.find(m => m.metricKey === 'communities_reached')?.metricValue || 0;
      const eventsHeld = impactMetrics.find(m => m.metricKey === 'events_held')?.metricValue || 0;

      res.json({
        stats: [
          { 
            number: `${volunteers.length}+`, 
            label: "Youth Mentored", 
            description: "Through our mentorship programs" 
          },
          { 
            number: `${childrenSupported}+`, 
            label: "Children Supported", 
            description: "With educational materials" 
          },
          { 
            number: `${communitiesReached}+`, 
            label: "Communities Reached", 
            description: "Across Liberia" 
          },
          { 
            number: `${eventsHeld}+`, 
            label: "Leadership Events", 
            description: "Workshops and camps held" 
          }
        ]
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching metrics: " + error.message });
    }
  });

  // Get approved testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching testimonials: " + error.message });
    }
  });

  // Submit testimonial (requires approval)
  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonial = insertTestimonialSchema.parse(req.body);
      const result = await storage.createTestimonial(testimonial);
      res.json({ success: true, id: result.id, message: "Testimonial submitted for review" });
    } catch (error: any) {
      res.status(400).json({ message: "Invalid testimonial: " + error.message });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletter = insertNewsletterSchema.parse(req.body);
      const result = await storage.createNewsletter(newsletter);
      res.json({ success: true, id: result.id });
    } catch (error: any) {
      if (error.message?.includes('duplicate')) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      res.status(400).json({ message: "Invalid subscription: " + error.message });
    }
  });

  // Get published news articles
  app.get("/api/news", async (req, res) => {
    try {
      const articles = await storage.getNewsArticles(true);
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching news: " + error.message });
    }
  });

  // Get published events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents(true);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching events: " + error.message });
    }
  });

  // Get published documents
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getDocuments(true);
      res.json(documents);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching documents: " + error.message });
    }
  });

  // Get website content (public access for pages like donate, about, etc.)
  app.get("/api/content", async (req, res) => {
    try {
      const section = req.query.section as string | undefined;
      const content = section 
        ? await storage.getWebsiteContentBySection(section)
        : await storage.getWebsiteContent();
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching content: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
