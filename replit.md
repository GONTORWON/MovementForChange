# MCEFL NGO Website

## Overview

This project is a professional website for the Movement for Change and Empowering Future Leaders (MCEFL), a Liberian NGO. Its primary purpose is to empower youth, develop leadership, and provide community support. The platform informs about programs, facilitates volunteer applications, processes donations via Stripe, and showcases testimonials. It's built as a modern full-stack web application with a React frontend and an Express backend. The project aims to enhance MCEFL's online presence, streamline operations, and support fundraising efforts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18 with TypeScript:** For type-safe component development.
- **Vite:** As the build tool and development server.
- **Wouter:** For lightweight client-side routing.
- **TanStack Query (React Query):** For server state management and caching.
- **React Hook Form with Zod validation:** For form handling.
- **Shadcn UI built on Radix UI primitives:** For a modern component library.
- **Tailwind CSS:** For utility-first styling.

**Design Decisions:**
- **Single Page Application (SPA):** With client-side routing.
- **Component-based architecture:** With reusable UI components.
- **Custom design system:** Using CSS variables for theming.
- **Dark/Light Theme Support:** Global ThemeProvider with localStorage persistence and a theme toggle.
- **Mobile-first responsive design.**
- **Comprehensive navigation:** Including a dynamic "Programs" dropdown menu with accessibility features.
- **SEO Optimization:** Using `react-helmet` for meta tags, OpenGraph, and Twitter cards.
- **UI/UX Decisions:** Orange (hsl(25, 95%, 53%)) as primary color, blue (hsl(221, 68%, 40%)) as secondary.

### Backend Architecture

**Technology Stack:**
- **Express.js with TypeScript:** For the server.
- **PostgreSQL via Neon serverless:** For the database.
- **Drizzle ORM:** For type-safe database operations.
- **Stripe:** For payment processing.

**API Structure:**
- **RESTful API endpoints:** Under the `/api` prefix for contact, volunteer applications, donations, testimonials, news, events, documents, and impact metrics.

**System Design Choices:**
- **Modular backend architecture:** Separating authentication, admin, public routes, and social media services.
- **Storage abstraction layer (IStorage interface):** For database operations flexibility.
- **Middleware protection:** For admin and protected routes (e.g., `requireAuth`, `requireAdmin`).
- **Session-based authentication:** Using `express-session` with `bcrypt`.
- **Environment-based configuration:** For development vs. production settings.
- **Dynamic Content Management:** Extended database schema with tables for newsletter subscribers, news articles, events, documents, program registrations, site settings, recurring donations, and social media management.
- **Admin Portal:** Comprehensive role-based access control (admin, staff, volunteer, donor) for managing contact submissions, volunteer applications, testimonials, news, events, newsletter subscribers, impact metrics, and users.
- **Social Media Integration:** Automated and manual posting for News and Events to Facebook, Twitter (X), and LinkedIn, managed via an admin panel.

### Data Storage

**Database Schema (Drizzle ORM with PostgreSQL):**
- **Core tables:** `users`, `contact_submissions`, `volunteer_applications`, `donations`, `testimonials`.
- **Extended tables:** `newsletter_subscribers`, `news_articles`, `events`, `documents`, `program_registrations`, `settings`, `recurring_donations`, `social_media_settings`, `social_media_posts`.
- **Design Decisions:** UUID primary keys, Zod schemas for runtime validation, type safety for insert/select operations, timestamp tracking.

## External Dependencies

**Third-Party Services:**
- **Stripe:** Payment processing for donations (Stripe.js, React Stripe.js, webhooks).
- **Neon Database:** Serverless PostgreSQL database (`@neondatabase/serverless`).
- **Resend/SendGrid (Future consideration):** For email notifications.

**Development Tools:**
- **Replit Plugins:** Cartographer, Runtime error overlay, Dev banner.

**UI Component Libraries & Utilities:**
- **Radix UI:** Accessible, unstyled primitives.
- **Shadcn UI:** Pre-styled components built on Radix UI with Tailwind CSS.
- **Lucide React:** Icon library.
- **Font Awesome:** For social media and decorative icons.
- **Google Fonts:** (Inter, Roboto, Poppins) for typography.
- **class-variance-authority (CVA):** For component variant management.
- **clsx and tailwind-merge:** For conditional class composition.
- **Date-fns:** For date formatting.
- **TipTap:** Rich Text Editor for content creation.