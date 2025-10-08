# MCEFL NGO Website

## Overview

This is a professional website for the Movement for Change and Empowering Future Leaders (MCEFL), a Liberian NGO focused on youth empowerment, leadership development, and community support. The platform provides information about programs, enables volunteer applications, facilitates donations through Stripe, and showcases testimonials. The application is built as a modern full-stack web application with a React frontend and Express backend.

## Recent Changes (October 2025)

**Admin Portal & Content Management System (NEW):**
- Implemented comprehensive admin portal with role-based access control (admin, staff, volunteer, donor)
- Session-based authentication using express-session with bcrypt password hashing
- Admin dashboard at `/admin` with real-time statistics and analytics
- Modular admin pages for managing:
  - Contact submissions (view, delete)
  - Volunteer applications (view, delete)
  - Testimonials (approve/unapprove, delete)
  - News articles (create, edit, publish, delete with WYSIWYG editing)
  - Events (create, edit, publish, delete with date/location management)
  - Newsletter subscribers (view all subscriptions)
  - Impact metrics (create, update metrics)
  - User management (admin-only access)
- Created reusable AdminLayout component with sidebar navigation
- Login page at `/login` with secure authentication
- Default admin user: username=admin, password=admin123

**Dynamic Content Management:**
- Extended database schema with 7 new tables:
  - `newsletter_subscribers` - Email subscriptions with timestamps
  - `news_articles` - Dynamic news with slug, content, publish status, featured images
  - `events` - Event management with date/time, location, registration URLs
  - `documents` - Downloadable resources with categories and access control
  - `program_registrations` - Event/program registration tracking
  - `settings` - Site-wide configuration management
  - `recurring_donations` - Recurring payment tracking
- All tables support publish/draft workflow for controlled content release

**Public-Facing Features:**
- Newsletter subscription form integrated in footer with real-time feedback
- Testimonial submission form on `/testimonials` page with approval workflow
- Public API endpoints for:
  - Newsletter subscription (POST `/api/newsletter`)
  - Testimonial submission (POST `/api/testimonials`)
  - Published news articles (GET `/api/news`)
  - Published events (GET `/api/events`)
  - Published documents (GET `/api/documents`)
  - Impact metrics (GET `/api/metrics`)

**Architecture & Security:**
- Modular backend architecture:
  - `server/auth.ts` - Authentication utilities and middleware
  - `server/admin-routes.ts` - Protected admin endpoints
  - `server/routes.ts` - Public and auth routes
- Middleware protection for admin routes (requireAuth, requireAdminOrStaff, requireAdmin)
- Frontend AuthContext for global authentication state
- ProtectedRoute component for route-level access control
- Session storage using PostgreSQL via connect-pg-simple

**Technical Implementation:**
- Storage layer extended with 30+ new CRUD methods in IStorage interface
- Type-safe API with Zod validation for all data operations
- Frontend admin components with data tables, forms, and dialogs
- Real-time cache invalidation using TanStack Query
- Comprehensive test coverage including e2e admin portal testing
- Impact Metrics Dashboard: Homepage now displays real-time metrics from database, admin can manage via /admin/metrics

**Email Integration Note:**
- User dismissed Resend integration setup
- For future email notifications (donation confirmations, volunteer applications, contact auto-responder), will need to either:
  1. Set up Resend/SendGrid integration with API keys as secrets, OR
  2. Use alternative email service with manual API key configuration

**Previous Changes (January 2025):**

**Theme & Color Scheme:**
- Restored primary color to orange (hsl(25, 95%, 53%)) from white
- Maintained secondary color as blue (hsl(221, 68%, 40%))
- Implemented dark/light theme toggle with localStorage persistence
- Added theme toggle buttons in navigation (desktop and mobile) with accessibility labels
- Complete dark mode color palette professionally balanced with proper contrast:
  - Dark background: hsl(215, 25%, 10%)
  - Dark cards: hsl(215, 25%, 12%)
  - Light text: hsl(0, 0%, 98%)
  - Enhanced shadows and gradients for dark mode
- Footer fully optimized for both themes with proper text contrast
- All buttons, links, and interactive elements maintain accessibility in both modes

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

**Legal Pages:**
- Added three comprehensive legal pages accessible from footer:
  - Privacy Policy (`/privacy-policy`) - 11 sections covering data collection, usage, sharing, security, user rights, and compliance
  - Terms of Service (`/terms-of-service`) - 14 sections including donation policy, volunteer agreements, IP rights, disclaimers, and governing law
  - Cookie Policy (`/cookie-policy`) - 10 sections with detailed cookie information, types table, and browser management instructions
- All pages feature consistent card-based layout with proper SEO metadata
- Full dark/light theme support with accessible contrast
- Footer links updated to route to actual legal pages using wouter Link components
- All interactive elements have data-testid attributes for testing

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