# MCEFL NGO Website Design Guidelines

## Design Approach
**Reference-Based: Modern NGO Pattern** - Drawing from charity: water, Khan Academy, and contemporary nonprofit sites that balance emotional storytelling with credibility and clear calls to action.

## Typography System
- **Primary Font**: Inter or DM Sans (Google Fonts) - clean, professional sans-serif
- **Hierarchy**:
  - Hero Headlines: text-5xl to text-7xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Subsections: text-xl to text-2xl, font-medium
  - Body Text: text-base to text-lg, font-normal
  - Supporting Text: text-sm, font-normal

## Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Component gaps: gap-6 to gap-8
- Container: max-w-7xl with px-6

## Navigation Structure
**Header Component**:
- Sticky navigation with backdrop blur
- Logo left, navigation center/right
- Programs dropdown (hover/click trigger):
  - Youth Leadership
  - Education Initiatives
  - Community Development
  - Skills Training
- "Donate" CTA button (prominent, standalone)
- Theme toggle icon
- Mobile: Hamburger menu with slide-in panel

**Programs Dropdown Design**:
- Grid layout: 2 columns on desktop
- Each item: Icon + Title + Brief description (1 line)
- Subtle hover state with background treatment
- Arrow indicators for navigation

## Homepage Sections

**Hero Section** (80vh):
- Large hero image: Liberian youth engaged in leadership/community activity
- Image overlay: subtle gradient for text readability
- Centered content with blur-backed button group
- Headline emphasizing empowerment + mission statement
- Two CTAs: "Get Involved" (primary) + "Our Impact" (secondary)

**Impact Metrics** (full-width, py-20):
- 4-column grid (stack on mobile)
- Large numbers with animated count-up effect
- Labels: Youth Empowered, Communities Reached, Programs Running, Years of Impact

**Mission Statement** (max-w-4xl, py-16):
- Centered text block
- Supporting image to the right (50/50 split on desktop)
- Visual: Team/community gathering photo

**Featured Programs** (py-24):
- 3-column card grid
- Each card: Image top, icon, title, description, "Learn More" link
- Subtle border, hover lift effect

**Success Stories** (py-20):
- 2-column testimonial layout
- Photo + quote + name/role
- Alternating image position (left/right)

**Call to Action Banner** (full-width, py-16):
- Centered content
- Strong headline + supporting text
- Button group: "Donate Now" + "Become a Volunteer"

**Footer**:
- 4-column grid: About, Quick Links, Programs (dropdown items), Contact
- Social media icons
- Newsletter signup form
- Trust indicators: Registration numbers, partner logos

## Component Library

**shadcn Components to Use**:
- Button (with variants: default, outline, ghost)
- Card (for programs, testimonials)
- DropdownMenu (navigation)
- Sheet (mobile menu)
- Separator (section dividers)
- Badge (program categories)

**Custom Patterns**:
- Stat Counter Cards: Icon + Number + Label
- Program Cards: Image + Content + CTA
- Testimonial Blocks: Quote style with attribution
- Impact Timeline: Visual progress markers

## Images Specification

**Required Images**:
1. **Hero**: Wide landscape (1920x800px min) - Diverse Liberian youth in leadership activity, bright and inspiring
2. **Mission Section**: Team photo (800x600px) - MCEFL staff/volunteers with community members
3. **Program Cards** (3): Each 600x400px - Youth in education, community projects, skills training
4. **Testimonials** (2-4): Headshots (300x300px) - Program participants/beneficiaries
5. **Footer**: Partner organization logos (various sizes)

**Image Treatment**:
- Hero: Subtle overlay for text contrast
- Cards: Slight aspect ratio crop for consistency
- All images: Lazy loading, responsive srcset
- Buttons on images: backdrop-blur-sm background treatment

## Accessibility Standards
- ARIA labels on all interactive elements
- Keyboard navigation for dropdown menus
- Focus visible states on all focusable elements
- Semantic HTML structure (nav, main, section, article)
- Alt text for all images describing context
- Color contrast ratios meet WCAG AA (handled by theme)
- Skip to main content link

## Responsive Breakpoints
- Mobile: Single column, stacked navigation
- Tablet (md): 2-column grids, inline navigation
- Desktop (lg+): Full multi-column layouts, dropdown menus