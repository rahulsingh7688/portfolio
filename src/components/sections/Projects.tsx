'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS, type FilterTag } from '@/lib/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

type ActiveFilter = 'All' | FilterTag;

const FILTERS: ActiveFilter[] = ['All', 'AI', 'Data', 'Backend'];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <div className="py-24 bg-white dark:bg-slate-900">
      <SectionWrapper id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Projects That Delivered Results
            </h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-colors',
                  activeFilter === filter
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
