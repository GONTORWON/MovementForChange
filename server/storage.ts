import { 
  users, contactSubmissions, volunteerApplications, donations, testimonials,
  newsArticles, events, newsletters, documents, programRegistrations, impactMetrics,
  type User, type InsertUser, type ContactSubmission, type InsertContactSubmission,
  type VolunteerApplication, type InsertVolunteerApplication,
  type Donation, type InsertDonation, type Testimonial, type InsertTestimonial,
  type NewsArticle, type InsertNewsArticle, type Event, type InsertEvent,
  type Newsletter, type InsertNewsletter, type Document, type InsertDocument,
  type ProgramRegistration, type InsertProgramRegistration,
  type ImpactMetric, type InsertImpactMetric
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  deleteContactSubmission(id: string): Promise<boolean>;
  
  // Volunteer Applications
  createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication>;
  getVolunteerApplications(): Promise<VolunteerApplication[]>;
  deleteVolunteerApplication(id: string): Promise<boolean>;
  
  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: string, status: string): Promise<Donation | undefined>;
  getDonations(): Promise<Donation[]>;
  
  // Testimonials
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
  updateTestimonialApproval(id: string, isApproved: boolean): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
  
  // News Articles
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
  getNewsArticles(publishedOnly?: boolean): Promise<NewsArticle[]>;
  getNewsArticle(id: string): Promise<NewsArticle | undefined>;
  updateNewsArticle(id: string, data: Partial<InsertNewsArticle>): Promise<NewsArticle | undefined>;
  deleteNewsArticle(id: string): Promise<boolean>;
  
  // Events
  createEvent(event: InsertEvent): Promise<Event>;
  getEvents(publishedOnly?: boolean): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  updateEvent(id: string, data: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
  
  // Newsletters
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletters(): Promise<Newsletter[]>;
  updateNewsletterSubscription(id: string, isSubscribed: boolean): Promise<Newsletter | undefined>;
  
  // Documents
  createDocument(document: InsertDocument): Promise<Document>;
  getDocuments(publishedOnly?: boolean): Promise<Document[]>;
  updateDocument(id: string, data: Partial<InsertDocument>): Promise<Document | undefined>;
  deleteDocument(id: string): Promise<boolean>;
  
  // Program Registrations
  createProgramRegistration(registration: InsertProgramRegistration): Promise<ProgramRegistration>;
  getProgramRegistrations(eventId?: string): Promise<ProgramRegistration[]>;
  updateRegistrationStatus(id: string, status: string): Promise<ProgramRegistration | undefined>;
  
  // Impact Metrics
  getImpactMetrics(): Promise<ImpactMetric[]>;
  getImpactMetric(metricKey: string): Promise<ImpactMetric | undefined>;
  upsertImpactMetric(metric: InsertImpactMetric): Promise<ImpactMetric>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return result;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const [result] = await db
      .insert(volunteerApplications)
      .values(application)
      .returning();
    return result;
  }

  async getVolunteerApplications(): Promise<VolunteerApplication[]> {
    return await db
      .select()
      .from(volunteerApplications)
      .orderBy(desc(volunteerApplications.createdAt));
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const [result] = await db
      .insert(donations)
      .values(donation)
      .returning();
    return result;
  }

  async updateDonationStatus(id: string, status: string): Promise<Donation | undefined> {
    const [result] = await db
      .update(donations)
      .set({ status })
      .where(eq(donations.id, id))
      .returning();
    return result || undefined;
  }

  async getDonations(): Promise<Donation[]> {
    return await db
      .select()
      .from(donations)
      .orderBy(desc(donations.createdAt));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [result] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return result;
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .orderBy(desc(testimonials.createdAt));
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [result] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async deleteContactSubmission(id: string): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async deleteVolunteerApplication(id: string): Promise<boolean> {
    const result = await db.delete(volunteerApplications).where(eq(volunteerApplications.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async updateTestimonialApproval(id: string, isApproved: boolean): Promise<Testimonial | undefined> {
    const [result] = await db.update(testimonials).set({ isApproved }).where(eq(testimonials.id, id)).returning();
    return result || undefined;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle> {
    const [result] = await db.insert(newsArticles).values(article).returning();
    return result;
  }

  async getNewsArticles(publishedOnly = false): Promise<NewsArticle[]> {
    const query = db.select().from(newsArticles);
    if (publishedOnly) {
      return await query.where(eq(newsArticles.isPublished, true)).orderBy(desc(newsArticles.publishedAt));
    }
    return await query.orderBy(desc(newsArticles.createdAt));
  }

  async getNewsArticle(id: string): Promise<NewsArticle | undefined> {
    const [result] = await db.select().from(newsArticles).where(eq(newsArticles.id, id));
    return result || undefined;
  }

  async updateNewsArticle(id: string, data: Partial<InsertNewsArticle>): Promise<NewsArticle | undefined> {
    const [result] = await db.update(newsArticles).set({ ...data, updatedAt: new Date() }).where(eq(newsArticles.id, id)).returning();
    return result || undefined;
  }

  async deleteNewsArticle(id: string): Promise<boolean> {
    const result = await db.delete(newsArticles).where(eq(newsArticles.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [result] = await db.insert(events).values(event).returning();
    return result;
  }

  async getEvents(publishedOnly = false): Promise<Event[]> {
    const query = db.select().from(events);
    if (publishedOnly) {
      return await query.where(eq(events.isPublished, true)).orderBy(events.date);
    }
    return await query.orderBy(events.date);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const [result] = await db.select().from(events).where(eq(events.id, id));
    return result || undefined;
  }

  async updateEvent(id: string, data: Partial<InsertEvent>): Promise<Event | undefined> {
    const [result] = await db.update(events).set(data).where(eq(events.id, id)).returning();
    return result || undefined;
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const [result] = await db.insert(newsletters).values(newsletter).returning();
    return result;
  }

  async getNewsletters(): Promise<Newsletter[]> {
    return await db.select().from(newsletters).where(eq(newsletters.isSubscribed, true)).orderBy(desc(newsletters.createdAt));
  }

  async updateNewsletterSubscription(id: string, isSubscribed: boolean): Promise<Newsletter | undefined> {
    const [result] = await db.update(newsletters).set({ isSubscribed }).where(eq(newsletters.id, id)).returning();
    return result || undefined;
  }

  async createDocument(document: InsertDocument): Promise<Document> {
    const [result] = await db.insert(documents).values(document).returning();
    return result;
  }

  async getDocuments(publishedOnly = false): Promise<Document[]> {
    const query = db.select().from(documents);
    if (publishedOnly) {
      return await query.where(eq(documents.isPublished, true)).orderBy(desc(documents.year));
    }
    return await query.orderBy(desc(documents.createdAt));
  }

  async updateDocument(id: string, data: Partial<InsertDocument>): Promise<Document | undefined> {
    const [result] = await db.update(documents).set(data).where(eq(documents.id, id)).returning();
    return result || undefined;
  }

  async deleteDocument(id: string): Promise<boolean> {
    const result = await db.delete(documents).where(eq(documents.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }

  async createProgramRegistration(registration: InsertProgramRegistration): Promise<ProgramRegistration> {
    const [result] = await db.insert(programRegistrations).values(registration).returning();
    return result;
  }

  async getProgramRegistrations(eventId?: string): Promise<ProgramRegistration[]> {
    if (eventId) {
      return await db.select().from(programRegistrations).where(eq(programRegistrations.eventId, eventId)).orderBy(desc(programRegistrations.createdAt));
    }
    return await db.select().from(programRegistrations).orderBy(desc(programRegistrations.createdAt));
  }

  async updateRegistrationStatus(id: string, status: string): Promise<ProgramRegistration | undefined> {
    const [result] = await db.update(programRegistrations).set({ status }).where(eq(programRegistrations.id, id)).returning();
    return result || undefined;
  }

  async getImpactMetrics(): Promise<ImpactMetric[]> {
    return await db.select().from(impactMetrics).orderBy(impactMetrics.metricKey);
  }

  async getImpactMetric(metricKey: string): Promise<ImpactMetric | undefined> {
    const [result] = await db.select().from(impactMetrics).where(eq(impactMetrics.metricKey, metricKey));
    return result || undefined;
  }

  async upsertImpactMetric(metric: InsertImpactMetric): Promise<ImpactMetric> {
    const [result] = await db
      .insert(impactMetrics)
      .values(metric)
      .onConflictDoUpdate({
        target: impactMetrics.metricKey,
        set: { metricValue: metric.metricValue, metricLabel: metric.metricLabel, metricDescription: metric.metricDescription, updatedAt: new Date() }
      })
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
