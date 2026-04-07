import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Certifications } from '@/components/sections/Certifications';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Rahul Singh — Senior Data Analyst & AI Engineer',
  description:
    'I build scalable data systems and AI-powered solutions. 9+ years of experience in data analytics, machine learning, and backend development. Available for freelance and full-time roles.',
  openGraph: {
    title: 'Rahul Singh — Senior Data Analyst & AI Engineer',
    description:
      'I build scalable data systems and AI-powered solutions. 9+ years of experience.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: 'https://rahulsingh.dev',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
