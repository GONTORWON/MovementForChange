import { 
  users, contactSubmissions, volunteerApplications, donations, testimonials,
  type User, type InsertUser, type ContactSubmission, type InsertContactSubmission,
  type VolunteerApplication, type InsertVolunteerApplication,
  type Donation, type InsertDonation, type Testimonial, type InsertTestimonial
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication>;
  getVolunteerApplications(): Promise<VolunteerApplication[]>;
  
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: string, status: string): Promise<Donation | undefined>;
  getDonations(): Promise<Donation[]>;
  
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getAllTestimonials(): Promise<Testimonial[]>;
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
}

export const storage = new DatabaseStorage();
