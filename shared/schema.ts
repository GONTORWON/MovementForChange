import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  role: text("role").default("volunteer").notNull(), // 'admin', 'staff', 'volunteer', 'donor'
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const volunteerApplications = pgTable("volunteer_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  skills: text("skills"),
  availability: text("availability"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  amount: integer("amount").notNull(), // Amount in cents
  currency: text("currency").default("usd").notNull(),
  donorName: text("donor_name"),
  donorEmail: text("donor_email"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  status: text("status").notNull(), // 'pending', 'succeeded', 'failed'
  type: text("type").default("general"), // 'general', 'sponsor-child'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").default(5),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsArticles = pgTable("news_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  author: text("author"),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  time: text("time"),
  location: text("location").notNull(),
  category: text("category").notNull(),
  capacity: integer("capacity"),
  registeredCount: integer("registered_count").default(0),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  isSubscribed: boolean("is_subscribed").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // 'annual-report', 'brochure', 'impact-report', 'financial'
  fileUrl: text("file_url").notNull(),
  year: integer("year"),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const programRegistrations = pgTable("program_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  notes: text("notes"),
  status: text("status").default("registered").notNull(), // 'registered', 'attended', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const impactMetrics = pgTable("impact_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metricKey: text("metric_key").notNull().unique(), // 'youth_mentored', 'children_supported', etc.
  metricValue: integer("metric_value").notNull(),
  metricLabel: text("metric_label").notNull(),
  metricDescription: text("metric_description"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const socialMediaSettings = pgTable("social_media_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull().unique(), // 'facebook', 'twitter', 'linkedin'
  isEnabled: boolean("is_enabled").default(false).notNull(),
  autoPostNews: boolean("auto_post_news").default(false).notNull(),
  autoPostEvents: boolean("auto_post_events").default(false).notNull(),
  accountName: text("account_name"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const socialMediaPosts = pgTable("social_media_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(),
  contentType: text("content_type").notNull(), // 'news' or 'event'
  contentId: varchar("content_id").notNull(), // ID of the news article or event
  contentTitle: text("content_title").notNull(),
  postUrl: text("post_url"),
  platformPostId: text("platform_post_id"),
  status: text("status").notNull(), // 'pending', 'posted', 'failed'
  errorMessage: text("error_message"),
  postedAt: timestamp("posted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default("pending").notNull(), // 'pending', 'in-progress', 'completed', 'cancelled'
  priority: text("priority").default("medium").notNull(), // 'low', 'medium', 'high', 'urgent'
  assignedToId: varchar("assigned_to_id"), // User ID of staff member
  assignedToName: text("assigned_to_name"), // Name of staff member for display
  createdById: varchar("created_by_id").notNull(), // Admin user ID
  createdByName: text("created_by_name").notNull(), // Admin name for display
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  notes: text("notes"), // Additional notes or updates
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const websiteContent = pgTable("website_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contentKey: text("content_key").notNull().unique(), // 'hero_title', 'hero_subtitle', 'mission_statement', etc.
  contentValue: text("content_value").notNull(),
  contentType: text("content_type").default("text").notNull(), // 'text', 'html', 'url'
  section: text("section").notNull(), // 'homepage', 'about', 'programs', 'footer', etc.
  label: text("label").notNull(), // Human-readable label for admin UI
  description: text("description"), // Help text for admins
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertVolunteerApplicationSchema = createInsertSchema(volunteerApplications).omit({
  id: true,
  createdAt: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertNewsArticleSchema = createInsertSchema(newsArticles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
}).extend({
  date: z.string().or(z.date()).transform((val) => typeof val === 'string' ? new Date(val) : val),
});

export const insertNewsletterSchema = createInsertSchema(newsletters).omit({
  id: true,
  createdAt: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
});

export const insertProgramRegistrationSchema = createInsertSchema(programRegistrations).omit({
  id: true,
  createdAt: true,
});

export const insertImpactMetricSchema = createInsertSchema(impactMetrics).omit({
  id: true,
  updatedAt: true,
});

export const insertSocialMediaSettingSchema = createInsertSchema(socialMediaSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertSocialMediaPostSchema = createInsertSchema(socialMediaPosts).omit({
  id: true,
  createdAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
}).extend({
  dueDate: z.string().or(z.date()).optional().transform((val) => val ? (typeof val === 'string' ? new Date(val) : val) : undefined),
});

export const insertWebsiteContentSchema = createInsertSchema(websiteContent).omit({
  id: true,
  updatedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type VolunteerApplication = typeof volunteerApplications.$inferSelect;
export type InsertVolunteerApplication = z.infer<typeof insertVolunteerApplicationSchema>;
export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type SocialMediaSetting = typeof socialMediaSettings.$inferSelect;
export type InsertSocialMediaSetting = z.infer<typeof insertSocialMediaSettingSchema>;
export type SocialMediaPost = typeof socialMediaPosts.$inferSelect;
export type InsertSocialMediaPost = z.infer<typeof insertSocialMediaPostSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = z.infer<typeof insertNewsArticleSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type ProgramRegistration = typeof programRegistrations.$inferSelect;
export type InsertProgramRegistration = z.infer<typeof insertProgramRegistrationSchema>;
export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type InsertImpactMetric = z.infer<typeof insertImpactMetricSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type WebsiteContent = typeof websiteContent.$inferSelect;
export type InsertWebsiteContent = z.infer<typeof insertWebsiteContentSchema>;
