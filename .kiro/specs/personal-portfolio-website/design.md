# Design Document: Personal Portfolio Website

## Overview

A production-ready personal portfolio website for Rahul Singh, a Senior Data Analyst & AI Engineer with 9+ years of experience. The site is built on Next.js 14 (App Router), Tailwind CSS, and Framer Motion, targeting three audiences: freelance clients, product company recruiters, and startups seeking data/AI consulting.

The core positioning is "I Build Scalable Data Systems & AI-Powered Solutions." The design prioritizes conversion (clear CTAs), credibility (case studies, timeline, certifications), and performance (Lighthouse ≥ 90, CLS ≤ 0.1).

### Technology Stack

- **Framework**: Next.js 14 with App Router (React Server Components + Client Components)
- **Styling**: Tailwind CSS v3 with `tailwindcss-animate` plugin
- **Animations**: Framer Motion v11
- **Dark Mode**: `next-themes` for SSR-safe theme management
- **Forms**: React Hook Form + Zod for validation
- **Email**: Resend (or Nodemailer) via Next.js Route Handler
- **Images**: Next.js `<Image>` component
- **SEO**: Next.js Metadata API (generateMetadata)
- **Sitemap**: `next-sitemap` package
- **Testing**: Vitest + React Testing Library (unit/integration), fast-check (property-based)

---

## Architecture

The site follows a **page-centric, component-driven** architecture using Next.js App Router conventions. All sections of the homepage are rendered as React Server Components by default; only interactive islands (theme toggle, nav scroll spy, contact form, project filter, animations) are Client Components.

```
app/
  layout.tsx              ← Root layout: ThemeProvider, Nav, Footer
  page.tsx                ← Homepage: assembles all section components
  projects/
    [slug]/
      page.tsx            ← Dynamic case study page
  api/
    contact/
      route.ts            ← POST handler for contact form
  sitemap.ts              ← Next.js sitemap generation
  robots.ts               ← robots.txt generation

components/
  layout/
    Navbar.tsx            ← Sticky nav with scroll spy (Client)
    Footer.tsx
    ThemeToggle.tsx       ← Sun/moon toggle (Client)
    MobileMenu.tsx        ← Hamburger overlay (Client)
  sections/
    Hero.tsx
    About.tsx
    Skills.tsx
    Projects.tsx          ← Filter logic (Client)
    Experience.tsx
    Certifications.tsx
    Services.tsx
    Testimonials.tsx
    Contact.tsx
  ui/
    ProjectCard.tsx
    SkillBadge.tsx
    TimelineEntry.tsx
    TestimonialCard.tsx
    ServiceCard.tsx
    CertBadge.tsx
    Button.tsx
    SectionWrapper.tsx    ← Scroll-triggered animation wrapper (Client)
  forms/
    ContactForm.tsx       ← React Hook Form + Zod (Client)

lib/
  data/
    projects.ts           ← Project data + case study content
    skills.ts
    experience.ts
    services.ts
    testimonials.ts
    certifications.ts
  utils.ts
  validations.ts          ← Zod schemas

public/
  resume.pdf
  images/
  og-image.png
```

### Rendering Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` (homepage) | SSG (static) | No dynamic data; maximum performance |
| `/projects/[slug]` | SSG with `generateStaticParams` | All 5 slugs known at build time |
| `/api/contact` | Edge Runtime Route Handler | Low latency form submission |

### Data Flow

```
Static data files (lib/data/*.ts)
  → Server Components (sections)
    → Client Components (interactive islands)
      → User interactions (filter, scroll, theme, form)
        → API Route Handler (contact form only)
```

---

## Components and Interfaces

### SectionWrapper

A reusable Client Component that wraps every section and triggers Framer Motion entrance animations when the section scrolls into the viewport. Respects `prefers-reduced-motion`.

```typescript
interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  animationVariant?: 'fadeUp' | 'fadeIn' | 'stagger';
}
```

### Navbar

Sticky top navigation. Uses `IntersectionObserver` to track which section is active and highlights the corresponding nav link. Collapses to hamburger below 768px.

```typescript
interface NavItem {
  label: string;
  href: string; // e.g. '#about'
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];
```

### ProjectCard

```typescript
interface Project {
  slug: string;
  title: string;
  summary: string;       // one-sentence impact summary
  stack: string[];
  tags: FilterTag[];
  thumbnail?: string;
  caseStudy: CaseStudy;
}

type FilterTag = 'AI' | 'Data' | 'Backend';

interface CaseStudy {
  problem: string;
  solution: string;
  impact: string;
  details: string; // MDX or rich text
}
```

### ContactForm

```typescript
interface ContactFormValues {
  name: string;       // required
  email: string;      // required, valid email
  subject: string;    // required
  message: string;    // required, min 10 chars
}

interface ContactFormState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
}
```

### SkillCategory

```typescript
interface Skill {
  name: string;
  proficiency: 1 | 2 | 3 | 4 | 5; // drives visual indicator width
  icon?: string;
}

interface SkillCategory {
  category: 'Data & Analytics' | 'AI / Machine Learning' | 'Backend Development' | 'Cloud & Infrastructure';
  skills: Skill[];
}
```

### TimelineEntry

```typescript
interface ExperienceEntry {
  title: string;
  company: string;
  dateRange: string;
  description: string;
  isCurrent: boolean;
}
```

### Testimonial

```typescript
interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
}
```

### ServiceCard

```typescript
interface Service {
  title: string;
  description: string; // 2-3 sentences, outcome-focused
  icon: string;        // Lucide icon name or SVG path
}
```

---

## Data Models

### Project Data (lib/data/projects.ts)

All five projects are defined as static data. Each includes full case study content.

```typescript
export const PROJECTS: Project[] = [
  {
    slug: 'farmerpay-plus',
    title: 'FarmerPay+',
    summary: 'Mobile-first farmer onboarding platform with OTP + MPIN + JWT authentication.',
    stack: ['Django', 'REST APIs', 'JWT', 'Python'],
    tags: ['Backend', 'AI'],
    caseStudy: {
      problem: 'Rural farmers lacked access to digital payment infrastructure due to complex onboarding flows.',
      solution: 'Built a custom Django user model with OTP + MPIN + JWT authentication enabling mobile-first onboarding.',
      impact: 'Enabled 10,000+ farmer registrations with a 3-step onboarding flow.',
      details: '...',
    },
  },
  {
    slug: 'latex-ocr-model',
    title: 'LaTeX OCR Model',
    summary: 'CNN + LSTM + CTC Loss model for handwritten LaTeX recognition with beam search decoding.',
    stack: ['TensorFlow', 'Python', 'NLP'],
    tags: ['AI'],
    caseStudy: {
      problem: 'Manual transcription of handwritten mathematical notation is error-prone and slow.',
      solution: 'Designed a CNN + LSTM + CTC Loss architecture with beam search decoding for sequence recognition.',
      impact: 'Achieved competitive CER/WER scores on benchmark datasets.',
      details: '...',
    },
  },
  {
    slug: 'data-warehouse-modernization',
    title: 'Data Warehouse Modernization',
    summary: 'Migrated legacy Hive/EMR pipelines to a modern cloud warehouse, cutting costs and enabling AI readiness.',
    stack: ['Hive', 'Spark', 'Google Cloud', 'SQL'],
    tags: ['Data'],
    caseStudy: {
      problem: 'Legacy Hive/EMR infrastructure had high operational costs and poor query performance.',
      solution: 'Migrated to a modern cloud data warehouse with optimized partitioning and columnar storage.',
      impact: 'Reduced infrastructure costs by 40% and improved query performance by 3x.',
      details: '...',
    },
  },
  {
    slug: 'analytics-dashboard-platform',
    title: 'Analytics Dashboard Platform',
    summary: 'Embedded Plotly Dash dashboards with real-time data fetching and interactive chart types.',
    stack: ['Plotly Dash', 'Python', 'REST APIs'],
    tags: ['Data', 'Backend'],
    caseStudy: {
      problem: 'Business stakeholders needed self-service analytics without engineering intervention.',
      solution: 'Built an embedded Plotly Dash platform with real-time data fetching and interactive filtering.',
      impact: 'Reduced ad-hoc reporting requests by 60% and enabled daily self-service analytics.',
      details: '...',
    },
  },
  {
    slug: 'web-metrics-analytics-system',
    title: 'Web Metrics Analytics System',
    summary: 'Publisher analytics management system delivering traffic and engagement insights with automated reporting.',
    stack: ['Python', 'SQL', 'Data Warehousing'],
    tags: ['Data', 'Backend'],
    caseStudy: {
      problem: 'Publishers lacked unified visibility into traffic and engagement metrics across properties.',
      solution: 'Built a centralized analytics system with automated reporting pipelines and engagement dashboards.',
      impact: 'Delivered weekly automated reports to 50+ publishers, reducing manual reporting effort by 80%.',
      details: '...',
    },
  },
];
```

### Theme Persistence Model

Theme preference is stored in `localStorage` under the key `portfolio-theme` with values `'light'` or `'dark'`. `next-themes` handles SSR hydration safely by injecting a blocking script in `<head>` to prevent flash of unstyled content (FOUC).

### Contact Form Submission Model

```typescript
// POST /api/contact
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}
```

Validation is performed both client-side (Zod + React Hook Form) and server-side (Zod in the Route Handler) before dispatching the email.

### SEO Metadata Model

```typescript
// Per-page metadata shape (Next.js Metadata API)
interface PageMetadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    images: [{ url: string; width: number; height: number }];
    type: 'website' | 'article';
  };
  alternates: {
    canonical: string;
  };
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: About section achievement count

*For any* render of the About Me section, the number of quantified achievement items displayed must be greater than or equal to 3.

**Validates: Requirements 2.3**

---

### Property 2: Skills categories minimum count

*For any* skills dataset provided to the Skills section, the number of distinct category groups rendered must be greater than or equal to 4.

**Validates: Requirements 3.1**

---

### Property 3: Required skills membership

*For any* skill name in the required list (Python, SQL, Spark, Hive, TensorFlow, NLP, Django, REST APIs, JWT, Plotly Dash, Next.js, Tailwind CSS, Google Cloud / EMR, Data Warehousing), that skill must appear in the rendered Skills section.

**Validates: Requirements 3.3**

---

### Property 4: Skills proficiency indicator presence

*For any* skill rendered in the Skills section, a visual proficiency indicator element must be present in the DOM alongside that skill's name.

**Validates: Requirements 3.2**

---

### Property 5: Projects minimum count

*For any* render of the Projects section, the number of visible Project_Cards must be greater than or equal to 5 when the "All" filter is active.

**Validates: Requirements 4.1**

---

### Property 6: Project card required fields

*For any* project in the projects dataset, its rendered Project_Card must display the project title, impact summary, technology stack, and at least one filter tag.

**Validates: Requirements 4.2**

---

### Property 7: Project filter correctness

*For any* filter tag selection (AI, Data, or Backend), every visible Project_Card after filtering must include that tag in its tags array, and no card without that tag must be visible.

**Validates: Requirements 4.4**

---

### Property 8: Project card case study link

*For any* project in the projects dataset, its rendered Project_Card must contain a link whose href resolves to `/projects/{slug}`.

**Validates: Requirements 4.5**

---

### Property 9: Case study structure completeness

*For any* case study page rendered from the projects dataset, the page must contain a problem section, a solution section, and an impact section.

**Validates: Requirements 4.6**

---

### Property 10: Experience timeline ordering

*For any* experience dataset, the rendered Experience_Timeline must display entries in reverse chronological order (most recent entry first by start date).

**Validates: Requirements 5.1**

---

### Property 11: Timeline entry required fields

*For any* experience entry in the dataset, its rendered timeline node must display the job title, company name, date range, and description.

**Validates: Requirements 5.2**

---

### Property 12: Certifications minimum count

*For any* render of the Certifications section, the number of certification badges displayed must be greater than or equal to 2.

**Validates: Requirements 6.1**

---

### Property 13: Certification entry required fields

*For any* certification in the certifications dataset, its rendered entry must display the certification name, issuing organization, and a badge or icon element.

**Validates: Requirements 6.2**

---

### Property 14: Services minimum count

*For any* render of the Services section, the number of service cards displayed must be greater than or equal to 4.

**Validates: Requirements 7.1**

---

### Property 15: Service card required fields

*For any* service in the services dataset, its rendered ServiceCard must display the title, description, and an icon element.

**Validates: Requirements 7.2**

---

### Property 16: Testimonials minimum count

*For any* render of the Testimonials section, the number of testimonial entries in the data must be greater than or equal to 3.

**Validates: Requirements 8.1**

---

### Property 17: Testimonial entry required fields

*For any* testimonial in the testimonials dataset, its rendered card must display the name, role/company, and quote text.

**Validates: Requirements 8.2**

---

### Property 18: Contact form valid submission succeeds

*For any* ContactFormValues object where all fields are non-empty and the email is a valid email address, submitting the form must result in the form reaching a success state.

**Validates: Requirements 9.3**

---

### Property 19: Contact form invalid submission shows errors

*For any* ContactFormValues object where at least one required field is empty or the email is malformed, submitting the form must result in inline validation error messages being displayed and the form must not reach a success state.

**Validates: Requirements 9.4**

---

### Property 20: Active nav link matches visible section

*For any* section that is currently intersecting the viewport (as determined by IntersectionObserver), the corresponding navigation link must have the active CSS class applied.

**Validates: Requirements 10.4**

---

### Property 21: Theme preference persisted to localStorage

*For any* theme toggle action (switching to light or dark), the new theme value must be written to localStorage under the key `portfolio-theme` immediately after the toggle.

**Validates: Requirements 11.5**

---

### Property 22: SEO metadata completeness per page

*For any* page in the site (homepage and all case study pages), the page's metadata must include a non-empty title, meta description, Open Graph title, Open Graph description, Open Graph image URL, and canonical URL.

**Validates: Requirements 12.1**

---

### Property 23: Heading hierarchy correctness

*For any* page rendered in the site, there must be exactly one H1 element, and all H2 elements must appear after the H1, and all H3 elements must appear after at least one H2.

**Validates: Requirements 12.6**

---

## Error Handling

### Contact Form Errors

| Scenario | Behavior |
|---|---|
| Required field empty on submit | Inline error message below the field; form not submitted |
| Invalid email format | Inline error "Please enter a valid email address" |
| Network timeout / 5xx from API | Toast or inline error with message "Something went wrong. Your message was not sent. Please try again."; form data preserved |
| API returns 400 (validation failure) | Display server-side error message inline |

The form uses React Hook Form's `handleSubmit` which prevents submission if client-side Zod validation fails. The Route Handler performs a second Zod parse and returns structured error responses.

### Image Loading Errors

All `<Image>` components include an `onError` handler that swaps to a placeholder SVG. Profile image and project thumbnails have explicit `width`/`height` to prevent layout shift.

### Case Study 404

If a visitor navigates to `/projects/unknown-slug`, Next.js `notFound()` is called, rendering the default 404 page. `generateStaticParams` pre-generates all valid slugs at build time.

### Theme Hydration

`next-themes` injects a blocking inline script in `<head>` to read `localStorage` before first paint, preventing FOUC. If `localStorage` is unavailable (e.g., private browsing), the OS preference is used as fallback.

### Resume Download

The resume PDF is served from `/public/resume.pdf`. The download link uses `<a href="/resume.pdf" download>`. If the file is missing, the browser will show a 404 — this is handled by ensuring the file is committed to the repository.

---

## Testing Strategy

### Dual Testing Approach

Both unit/integration tests and property-based tests are required. They are complementary:

- **Unit/integration tests** catch concrete bugs in specific scenarios, edge cases, and integration points.
- **Property-based tests** verify universal correctness across a wide range of generated inputs, catching edge cases that hand-written examples miss.

### Unit and Integration Tests (Vitest + React Testing Library)

Focus areas:
- Rendering of each section component with mock data
- Contact form validation states (success, field errors, network error)
- Project filter behavior with specific tag selections
- Theme toggle interaction and localStorage write
- Navbar active link state with mocked IntersectionObserver
- Case study page rendering for each of the 5 slugs
- Hamburger menu open/close interaction
- `prefers-reduced-motion` disables animations (mock matchMedia)
- Resume download link has correct `href` and `download` attribute
- Verify links open in new tab (`target="_blank"`, `rel="noopener noreferrer"`)

Avoid writing unit tests for every possible input combination — property tests handle that coverage.

### Property-Based Tests (fast-check + Vitest)

Each property test must run a minimum of **100 iterations**. Each test must include a comment referencing the design property it validates.

Tag format: `// Feature: personal-portfolio-website, Property {N}: {property_text}`

| Property | Test Description | Generator |
|---|---|---|
| P3: Required skills membership | For any skills dataset that includes the required skills, all must appear in rendered output | `fc.shuffledSubarray` of required skills + extras |
| P4: Proficiency indicator presence | For any array of Skill objects, each rendered skill has an indicator | `fc.array(fc.record({ name: fc.string(), proficiency: fc.integer({min:1,max:5}) }))` |
| P6: Project card required fields | For any Project object, its card renders all required fields | `fc.record` with arbitrary project data |
| P7: Project filter correctness | For any filter tag and project list, filtered results only contain matching projects | `fc.constantFrom('AI','Data','Backend')` + `fc.array` of projects |
| P8: Project card case study link | For any project, its card contains a link to `/projects/{slug}` | `fc.record` with arbitrary slug |
| P9: Case study structure | For any CaseStudy object, the page renders problem, solution, impact | `fc.record` with arbitrary strings |
| P10: Timeline ordering | For any array of ExperienceEntry, rendered order is reverse chronological | `fc.array` of entries with arbitrary dates |
| P11: Timeline entry fields | For any ExperienceEntry, all four fields are rendered | `fc.record` with arbitrary strings |
| P13: Certification fields | For any Certification object, all three fields are rendered | `fc.record` with arbitrary strings |
| P15: Service card fields | For any Service object, all three fields are rendered | `fc.record` with arbitrary strings |
| P17: Testimonial fields | For any Testimonial object, all required fields are rendered | `fc.record` with arbitrary strings |
| P18: Valid form submission succeeds | For any valid ContactFormValues, submission reaches success state | `fc.record` with valid email generator |
| P19: Invalid form shows errors | For any ContactFormValues with at least one empty field, errors are shown | `fc.record` with at least one empty string field |
| P21: Theme persisted to localStorage | For any theme value toggled, localStorage is updated | `fc.constantFrom('light','dark')` |
| P22: SEO metadata completeness | For any page slug, metadata contains all required fields | `fc.constantFrom` of all page slugs |
| P23: Heading hierarchy | For any page rendered, H1 exists and heading order is correct | `fc.constantFrom` of all page slugs |

### Property Test Configuration

```typescript
// vitest.config.ts — ensure enough iterations
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});

// In each property test file:
fc.assert(fc.property(...generators, (input) => {
  // test body
}), { numRuns: 100 });
```

### Test File Structure

```
src/
  __tests__/
    unit/
      Hero.test.tsx
      About.test.tsx
      Skills.test.tsx
      Projects.test.tsx
      Experience.test.tsx
      Certifications.test.tsx
      Services.test.tsx
      Testimonials.test.tsx
      Contact.test.tsx
      Navbar.test.tsx
      ThemeToggle.test.tsx
    property/
      skills.property.test.ts
      projects.property.test.ts
      experience.property.test.ts
      contact-form.property.test.ts
      theme.property.test.ts
      seo.property.test.ts
```
