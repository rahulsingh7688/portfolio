import type { ExperienceEntry } from '@/lib/data/experience';
import { cn } from '@/lib/utils';

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineEntry({ entry }: TimelineEntryProps) {
  const { title, company, dateRange, description, isCurrent } = entry;

  return (
    <div
      className={cn(
        'relative pl-8 pb-8',
        'before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700'
      )}
    >
      {/* Timeline dot */}
      <span
        className={cn(
          'absolute left-0 top-1 w-6 h-6 rounded-full border-2',
          isCurrent
            ? 'border-indigo-500 bg-indigo-500'
            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
        )}
      />

      {/* Header row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
        <span className="text-indigo-600 dark:text-indigo-400">{company}</span>
        <span className="text-sm text-slate-500">{dateRange}</span>
        {isCurrent && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
            Current
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
