import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const stats = [
  { value: '9+', label: 'Years Experience' },
  { value: '5+', label: 'Projects Delivered' },
  { value: '50+', label: 'Publishers Served' },
];

const achievements = [
  'Reduced data infrastructure costs by 40% ($120K/year) through warehouse modernization',
  'Built AI-powered OCR model achieving 8.3% CER on benchmark datasets',
  'Automated reporting for 50+ publishers, cutting manual effort by 80%',
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column: image + stats */}
          <div className="flex flex-col gap-8">
            <Image
              src="/images/profile.jpg"
              alt="Rahul Singh — Senior Data Analyst & AI Engineer"
              width={400}
              height={400}
              className="rounded-2xl object-cover w-full"
            />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-indigo-600">{value}</span>
                  <span className="text-sm text-slate-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: text content */}
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Turning Data Into Decisions for 9+ Years
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              I&apos;m Rahul Singh, a Senior Data Analyst and AI Engineer with 9+ years of experience
              across ITES, BPO, and KPO domains. Currently leading data analytics and AI initiatives
              as Manager - MPS Insight &amp; Analytics, I specialize in building the data
              infrastructure that powers business decisions.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              My work sits at the intersection of data engineering, machine learning, and backend
              development. Whether it&apos;s migrating a legacy data warehouse, building an OCR model
              from scratch, or designing APIs for a fintech app — I focus on outcomes, not just
              outputs.
            </p>

            {/* Achievements */}
            <ul className="flex flex-col gap-3 mb-8">
              {achievements.map((achievement) => (
                <li key={achievement} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <CheckCircle2
                    size={20}
                    className="text-indigo-500 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button as="a" href="#contact" variant="primary" size="lg">
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
