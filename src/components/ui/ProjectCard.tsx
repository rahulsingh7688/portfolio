'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Project, FilterTag } from '@/lib/data/projects';

interface ProjectCardProps {
  project: Project;
}

const tagStyles: Record<FilterTag, string> = {
  AI: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  Data: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
  Backend: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, summary, stack, tags } = project;

  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient header */}
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-5">
        <h3 className="text-white font-semibold text-lg leading-snug">{title}</h3>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{summary}</p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'px-2.5 py-0.5 rounded-full text-xs font-semibold',
                tagStyles[tag]
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5">
        <Link
          href={`/projects/${slug}`}
          className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View Case Study →
        </Link>
      </div>
    </motion.div>
  );
}
