import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/lib/data/projects';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Rahul Singh`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Rahul Singh`,
      description: project.summary,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      type: 'article',
    },
    alternates: {
      canonical: `https://rahulsingh.dev/projects/${project.slug}`,
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const { title, summary, stack, tags, caseStudy } = project;
  const techLines = caseStudy.techDetails
    .split('\n')
    .filter((l) => l.trim().startsWith('•'));

  return (
    <article className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero header */}
      <header className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors text-sm mb-8"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Projects
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>

          {/* Summary */}
          <p className="text-indigo-100 text-lg leading-relaxed mb-8 max-w-2xl">{summary}</p>

          {/* Stack badges */}
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md bg-white/10 border border-white/20 text-white text-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Case study body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* The Problem */}
          <section aria-labelledby="problem-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 dark:text-red-400 text-lg font-bold" aria-hidden="true">
                  ?
                </span>
              </div>
              <h2
                id="problem-heading"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                The Problem
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg pl-13">
              {caseStudy.problem}
            </p>
          </section>

          {/* Divider */}
          <hr className="border-slate-200 dark:border-slate-700" />

          {/* The Solution */}
          <section aria-labelledby="solution-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 dark:text-indigo-400 text-lg font-bold" aria-hidden="true">
                  ✓
                </span>
              </div>
              <h2
                id="solution-heading"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                The Solution
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              {caseStudy.solution}
            </p>
          </section>

          {/* Divider */}
          <hr className="border-slate-200 dark:border-slate-700" />

          {/* The Impact */}
          <section aria-labelledby="impact-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 dark:text-green-400 text-lg font-bold" aria-hidden="true">
                  ↑
                </span>
              </div>
              <h2
                id="impact-heading"
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                The Impact
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              {caseStudy.impact}
            </p>
          </section>

          {/* Tech Details */}
          {techLines.length > 0 && (
            <>
              <hr className="border-slate-200 dark:border-slate-700" />
              <section aria-labelledby="tech-details-heading">
                <h2
                  id="tech-details-heading"
                  className="text-2xl font-bold text-slate-900 dark:text-white mb-6"
                >
                  Tech Details
                </h2>
                <ul className="space-y-3">
                  {techLines.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                    >
                      <span
                        className="text-indigo-500 font-bold mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <span className="leading-relaxed">
                        {line.trim().replace(/^•\s*/, '')}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-900/50 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Interested in working together?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            I&apos;m available for freelance projects and full-time roles.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
          >
            Hire Me
            <ExternalLink size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
