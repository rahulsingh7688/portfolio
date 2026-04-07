# Requirements Document

## Introduction

A production-ready personal portfolio website for Rahul Singh, a Senior Data Analyst / Data & AI Engineer with 9+ years of experience. The site targets three audiences: freelance clients (Upwork), product company recruiters, and startups seeking data/AI consulting. The core positioning is "I build scalable data systems & AI-powered solutions." The site must deliver a premium, high-conversion experience with compelling storytelling, strong CTAs, and a modern dark-mode-capable UI built on Next.js (App Router), Tailwind CSS, and Framer Motion.

## Glossary

- **Portfolio_Site**: The Next.js web application being built
- **Visitor**: Any person accessing the Portfolio_Site (recruiter, client, or startup)
- **Hero_Section**: The above-the-fold landing area with headline and primary CTA
- **Project_Card**: A UI component displaying a project summary with filtering metadata
- **Case_Study**: A detailed project page with problem → solution → impact narrative
- **Skills_Section**: The section displaying technical competencies with visual indicators
- **Experience_Timeline**: A chronological display of professional history
- **Contact_Form**: The form component used by Visitors to send messages
- **Theme**: The active color scheme, either light or dark
- **CTA**: Call-to-action button or link (e.g., "Hire Me", "Download Resume")
- **Filter_Tag**: A category label (AI, Data, Backend) used to filter Project_Cards
- **SEO_Metadata**: Page-level meta tags including title, description, Open Graph, and canonical URL
- **Resume**: A downloadable PDF file of Rahul Singh's curriculum vitae

---

## Requirements

### Requirement 1: Hero Section

**User Story:** As a Visitor, I want to immediately understand who Rahul Singh is and what he offers, so that I can decide within seconds whether to engage further.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL display the Hero_Section as the first visible section on the homepage.
2. THE Hero_Section SHALL display the headline "I Build Scalable Data Systems & AI-Powered Solutions" as the primary heading (H1).
3. THE Hero_Section SHALL display Rahul Singh's title "Senior Data Analyst & AI Engineer · 9+ Years Experience" as a subtitle.
4. THE Hero_Section SHALL include a primary CTA button labeled "Hire Me" that navigates the Visitor to the Contact_Form.
5. THE Hero_Section SHALL include a secondary CTA button labeled "View My Work" that scrolls the Visitor to the Projects section.
6. THE Hero_Section SHALL include a "Download Resume" button that triggers a download of the Resume PDF.
7. WHEN the Portfolio_Site loads, THE Hero_Section SHALL animate its headline, subtitle, and CTAs into view using Framer Motion entrance animations with a staggered delay not exceeding 1.2 seconds total.
8. THE Hero_Section SHALL display links to Rahul Singh's GitHub and LinkedIn profiles.
9. THE Portfolio_Site SHALL render the Hero_Section correctly on viewport widths from 320px to 2560px.

---

### Requirement 2: About Me Section

**User Story:** As a Visitor, I want to learn about Rahul Singh's background and professional identity, so that I can assess his credibility and fit for my needs.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include an About Me section below the Hero_Section.
2. THE About Me section SHALL present a narrative summary covering Rahul Singh's 9+ years of experience across ITES/BPO/KPO domains, current role as Manager - MPS Insight & Analytics, and focus on data systems and AI.
3. THE About Me section SHALL highlight at least three quantified or outcome-oriented achievements (e.g., cost savings, performance improvements, systems built).
4. THE About Me section SHALL include a "Hire Me" CTA button.
5. THE About Me section SHALL include a profile image placeholder with appropriate alt text.

---

### Requirement 3: Skills Section

**User Story:** As a Visitor, I want to see Rahul Singh's technical skills organized clearly, so that I can quickly assess his expertise relevant to my project or role.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a Skills_Section that groups competencies into at least four categories: Data & Analytics, AI / Machine Learning, Backend Development, and Cloud & Infrastructure.
2. THE Skills_Section SHALL display each skill with a visual proficiency indicator (e.g., progress bar, badge, or icon-based rating).
3. THE Skills_Section SHALL list the following skills at minimum: Python, SQL, Spark, Hive, TensorFlow, NLP, Django, REST APIs, JWT, Plotly Dash, Next.js, Tailwind CSS, Google Cloud / EMR, and Data Warehousing.
4. WHEN a Visitor hovers over a skill indicator, THE Skills_Section SHALL display a tooltip or highlight effect confirming the skill name.
5. THE Skills_Section SHALL include Rahul Singh's certifications: "Google Associate Data Analyst" and "Data Warehouse Management Certification," each displayed as a distinct badge.

---

### Requirement 4: Projects Section with Filtering

**User Story:** As a Visitor, I want to browse Rahul Singh's projects and filter them by category, so that I can find work most relevant to my needs.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a Projects section displaying at minimum five Project_Cards: FarmerPay+, LaTeX OCR Model, Data Warehouse Modernization, Analytics Dashboard Platform, and Web Metrics Analytics System.
2. EACH Project_Card SHALL display a project title, a one-sentence impact summary, the technology stack, and at least one Filter_Tag.
3. THE Projects section SHALL provide Filter_Tag buttons for the categories: All, AI, Data, and Backend.
4. WHEN a Visitor clicks a Filter_Tag button, THE Projects section SHALL display only Project_Cards matching that tag within 300ms, without a full page reload.
5. EACH Project_Card SHALL include a "View Case Study" link that navigates to a dedicated Case_Study page for that project.
6. EACH Case_Study page SHALL present the project using a problem → solution → impact narrative structure.
7. THE Case_Study for FarmerPay+ SHALL describe the authentication architecture (OTP + MPIN + JWT), the custom user model, and the business outcome of enabling mobile-first farmer onboarding.
8. THE Case_Study for LaTeX OCR Model SHALL describe the CNN + LSTM + CTC Loss architecture, beam search decoding, and the CER/WER evaluation results.
9. THE Case_Study for Data Warehouse Modernization SHALL describe the migration from Hive/EMR, cost optimization outcomes, and AI-readiness improvements.
10. THE Case_Study for Analytics Dashboard Platform SHALL describe the embedded Plotly Dash integration, interactive chart types, and real-time data fetching approach.
11. THE Case_Study for Web Metrics Analytics System SHALL describe publisher analytics management, reporting automation, and traffic/engagement insights delivered.
12. WHEN the Projects section loads into the viewport, THE Portfolio_Site SHALL animate Project_Cards into view using Framer Motion with a staggered entrance.

---

### Requirement 5: Experience Timeline

**User Story:** As a Visitor, I want to see Rahul Singh's career progression in a visual timeline, so that I can understand his professional growth and domain depth.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include an Experience_Timeline section displaying Rahul Singh's professional history in reverse chronological order.
2. EACH timeline entry SHALL display the job title, company/organization name, date range, and a brief description of responsibilities and achievements.
3. THE Experience_Timeline SHALL include the current role: Manager - MPS Insight & Analytics.
4. THE Experience_Timeline SHALL visually distinguish the current role from past roles (e.g., highlighted node, "Current" badge).
5. WHEN the Experience_Timeline scrolls into the viewport, THE Portfolio_Site SHALL animate each timeline entry into view sequentially using Framer Motion.

---

### Requirement 6: Certifications Section

**User Story:** As a Visitor, I want to see Rahul Singh's certifications, so that I can verify his formal credentials.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a Certifications section displaying at minimum two certifications: "Google Associate Data Analyst" and "Data Warehouse Management Certification."
2. EACH certification entry SHALL display the certification name, issuing organization, and a visual badge or icon.
3. WHERE a certification has a verifiable credential URL, THE Certifications section SHALL display a "Verify" link that opens the credential in a new browser tab.

---

### Requirement 7: Services / Freelance Consulting Section

**User Story:** As a potential client, I want to understand what services Rahul Singh offers, so that I can determine if he can solve my business problem.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a Services section listing at minimum four service offerings: Data Analytics & BI, AI/ML Model Development, Backend API Development, and Data Warehouse Design & Migration.
2. EACH service entry SHALL include a title, a two-to-three sentence description focused on business outcomes, and an icon.
3. THE Services section SHALL include a "Hire Me" CTA button that navigates the Visitor to the Contact_Form.
4. THE Services section SHALL frame each offering in terms of client value (e.g., "reduce reporting time," "automate manual workflows") rather than technology alone.

---

### Requirement 8: Testimonials Section

**User Story:** As a potential client or recruiter, I want to read testimonials from people who have worked with Rahul Singh, so that I can build trust before reaching out.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a Testimonials section displaying at minimum three placeholder testimonials.
2. EACH testimonial SHALL include a realistic name, role/company, a 2–4 sentence quote focused on professional impact, and an avatar placeholder.
3. THE Testimonials section SHALL display testimonials in a carousel or card grid layout.
4. WHERE the viewport width is less than 768px, THE Testimonials section SHALL display one testimonial at a time with swipe or navigation controls.

---

### Requirement 9: Contact Section

**User Story:** As a Visitor, I want to contact Rahul Singh easily, so that I can discuss a project, role, or collaboration.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a Contact section containing the Contact_Form and social/professional links.
2. THE Contact_Form SHALL include fields for: full name, email address, subject, and message body.
3. WHEN a Visitor submits the Contact_Form with all required fields populated and a valid email format, THE Contact_Form SHALL display a success confirmation message.
4. WHEN a Visitor submits the Contact_Form with one or more required fields empty, THE Contact_Form SHALL display inline validation error messages identifying each missing field without a page reload.
5. IF the Contact_Form submission fails due to a network or server error, THEN THE Contact_Form SHALL display a descriptive error message and preserve the Visitor's entered data.
6. THE Contact section SHALL display links to Rahul Singh's GitHub, LinkedIn, and email address.
7. THE Contact section SHALL include a "Download Resume" button.

---

### Requirement 10: Navigation and Layout

**User Story:** As a Visitor, I want smooth, intuitive navigation across all sections, so that I can explore the site without friction.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a sticky top navigation bar visible on all pages.
2. THE Navigation bar SHALL contain links to: Home, About, Skills, Projects, Experience, Services, and Contact.
3. WHEN a Visitor clicks a navigation link, THE Portfolio_Site SHALL smooth-scroll to the corresponding section within 600ms.
4. WHILE a Visitor scrolls past a section, THE Navigation bar SHALL highlight the corresponding navigation link as active.
5. WHERE the viewport width is less than 768px, THE Navigation bar SHALL collapse into a hamburger menu.
6. WHEN a Visitor opens the hamburger menu, THE Navigation bar SHALL display a full-screen or slide-in mobile menu overlay.

---

### Requirement 11: Dark Mode Support

**User Story:** As a Visitor, I want to toggle between light and dark themes, so that I can view the site comfortably in any environment.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL support both a light Theme and a dark Theme.
2. THE Navigation bar SHALL include a theme toggle control (e.g., sun/moon icon button).
3. WHEN a Visitor activates the theme toggle, THE Portfolio_Site SHALL switch the active Theme within 200ms without a page reload.
4. WHEN a Visitor first loads the Portfolio_Site, THE Portfolio_Site SHALL apply the Theme matching the Visitor's operating system preference (prefers-color-scheme).
5. WHEN a Visitor manually sets a Theme, THE Portfolio_Site SHALL persist that preference in localStorage and apply it on subsequent visits.

---

### Requirement 12: SEO and Performance

**User Story:** As a site owner, I want the portfolio to be discoverable and fast, so that it ranks well in search results and provides a good user experience.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include SEO_Metadata on every page, including a unique title tag, meta description, Open Graph title, Open Graph description, and Open Graph image.
2. THE Portfolio_Site SHALL use semantic HTML elements (header, main, section, article, footer, nav) throughout all pages.
3. THE Portfolio_Site SHALL achieve a Lighthouse Performance score of 90 or above on desktop.
4. THE Portfolio_Site SHALL use Next.js Image component for all images to enable automatic optimization and lazy loading.
5. THE Portfolio_Site SHALL include a sitemap.xml and robots.txt accessible at the site root.
6. THE Portfolio_Site SHALL use descriptive, keyword-rich heading hierarchy (H1 → H2 → H3) on every page.

---

### Requirement 13: Responsiveness

**User Story:** As a Visitor on any device, I want the site to display correctly and be fully usable, so that I have a consistent experience regardless of screen size.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL render all sections correctly on viewport widths of 320px, 768px, 1024px, and 1440px.
2. THE Portfolio_Site SHALL use Tailwind CSS responsive utility classes to adapt layouts across breakpoints.
3. WHEN the viewport width is less than 768px, THE Portfolio_Site SHALL display single-column layouts for the Skills_Section, Projects section, and Services section.
4. THE Portfolio_Site SHALL ensure all interactive elements (buttons, links, form fields) have a minimum touch target size of 44x44px on mobile viewports.

---

### Requirement 14: Animations and Interactions

**User Story:** As a Visitor, I want smooth, purposeful animations that enhance the premium feel of the site, so that the experience feels polished and engaging.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL use Framer Motion for all entrance animations, hover effects, and page transitions.
2. WHEN a section enters the viewport, THE Portfolio_Site SHALL trigger a fade-in or slide-up entrance animation for that section's content.
3. WHEN a Visitor hovers over a Project_Card or CTA button, THE Portfolio_Site SHALL apply a subtle scale or shadow transition effect.
4. THE Portfolio_Site SHALL respect the Visitor's operating system reduced-motion preference (prefers-reduced-motion) by disabling non-essential animations.
5. THE Portfolio_Site SHALL ensure no animation blocks interactivity or causes layout shift (CLS score of 0.1 or below).
