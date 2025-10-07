# MCEFL NGO Website

## Overview

This is a professional website for the Movement for Change and Empowering Future Leaders (MCEFL), a Liberian NGO focused on youth empowerment, leadership development, and community support. The platform provides information about programs, enables volunteer applications, facilitates donations through Stripe, and showcases testimonials. The application is built as a modern full-stack web application with a React frontend and Express backend.

## Recent Changes (January 2025)

**Theme & Color Scheme:**
- Restored primary color to orange (hsl(25, 95%, 53%)) from white
- Maintained secondary color as blue (hsl(221, 68%, 40%))
- Implemented dark/light theme toggle with localStorage persistence
- Added theme toggle buttons in navigation (desktop and mobile) with accessibility labels
- Complete dark mode color palette for all components

**Leadership Section:**
- Added "Our Leadership" section to About page
- Displays 6 leadership team members with individual details:
  - Executive Director: Samuel K. Johnson
  - Program Director: Mary T. Williams
  - Finance Director: James B. Cooper
  - Community Outreach Coordinator: Grace M. Harris
  - Youth Engagement Manager: Emmanuel D. Roberts
  - Education & Training Specialist: Linda S. Thompson
- Each leader card includes profile image, name, position, bio, and email contact
- Responsive 3-column grid layout with hover animations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching
- React Hook Form with Zod validation for form handling
- Shadcn UI component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens

**Design Decisions:**
- Single Page Application (SPA) architecture with client-side routing
- Component-based architecture with reusable UI components in `/client/src/components/ui`
- Custom design system with CSS variables for theming (primary, secondary, accent colors)
- **Dark/Light Theme Support:** Global ThemeProvider with localStorage persistence, theme toggle in navigation
- Mobile-first responsive design approach
- Organized page structure: Home, About, Programs, Get Involved, Testimonials, News & Events, Contact, Donate, Program Details, Partnerships, Share Donation, Gallery, News Archive

### Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- PostgreSQL database via Neon serverless with WebSocket support
- Drizzle ORM for type-safe database operations
- Stripe integration for payment processing

**API Structure:**
- RESTful API endpoints under `/api` prefix
- Contact submissions: POST/GET `/api/contact`
- Volunteer applications: POST/GET `/api/volunteer`
- Donation processing: POST `/api/donate/create-payment-intent`, POST `/api/donate/webhook`
- Testimonials: GET `/api/testimonials`

**Architecture Decisions:**
- Storage abstraction layer (`IStorage` interface) for database operations, enabling easy swapping of database implementations
- Request logging middleware that captures method, path, status, duration, and response body for API routes
- Raw body preservation for Stripe webhook signature verification
- Environment-based configuration for development vs production builds

### Data Storage

**Database Schema (Drizzle ORM with PostgreSQL):**

Tables:
- `users` - Basic user authentication (username, password)
- `contact_submissions` - Contact form data with timestamps
- `volunteer_applications` - Volunteer signup information (name, email, phone, skills, availability)
- `donations` - Payment tracking with Stripe integration (amount, currency, donor info, payment intent ID, status, type)
- `testimonials` - User testimonials with approval workflow (name, role, content, rating, approval status)

**Design Decisions:**
- UUID primary keys for all tables using PostgreSQL's `gen_random_uuid()`
- Zod schemas for runtime validation matching database schema
- Separation of insert and select types for type safety
- Timestamp tracking on submissions for auditing

### External Dependencies

**Third-Party Services:**
- **Stripe** - Payment processing for donations
  - Stripe.js and React Stripe.js for frontend payment elements
  - Stripe webhooks for payment confirmation
  - Support for both general donations and child sponsorship
  
- **Neon Database** - Serverless PostgreSQL database
  - WebSocket connections for serverless compatibility
  - Connection pooling via `@neondatabase/serverless`

**Development Tools:**
- **Replit Plugins** - Development environment enhancements
  - Cartographer for code navigation
  - Runtime error overlay for debugging
  - Dev banner for development mode indication

**UI Component Library:**
- **Radix UI** - Comprehensive set of accessible, unstyled primitives (accordion, dialog, dropdown, form controls, etc.)
- **Shadcn UI** - Pre-styled components built on Radix UI with Tailwind CSS
- **Lucide React** - Icon library for UI elements

**Styling & Utilities:**
- Font Awesome for social media and decorative icons
- Google Fonts (Inter, Roboto, Poppins) for typography
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge for conditional class composition

**Form Management:**
- React Hook Form for performant form state management
- Hookform resolvers for Zod schema integration
- Date-fns for date formatting in forms and displays