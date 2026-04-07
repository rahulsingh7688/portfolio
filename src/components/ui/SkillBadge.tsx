'use client';

import { motion } from 'framer-motion';
import type { Skill } from '@/lib/data/skills';

const proficiencyLabels: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'Learning',
  2: 'Familiar',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

interface SkillBadgeProps {
  skill: Skill;
  index?: number;
}

export function SkillBadge({ skill, index = 0 }: SkillBadgeProps) {
  const widthPercent = `${(skill.proficiency / 5) * 100}%`;
  const label = proficiencyLabels[skill.proficiency];

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {skill.name}
      </span>

      {/* Bar container with tooltip on hover */}
      <div className="relative group">
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: widthPercent }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 }}
            aria-label={`${skill.name}: ${label}`}
          />
        </div>

        {/* Tooltip */}
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10"
        >
          {skill.name} — {label}
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-100" />
        </div>
      </div>
    </div>
  );
}
