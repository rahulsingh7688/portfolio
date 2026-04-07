import { EXPERIENCE } from '@/lib/data/experience';
import { TimelineEntry } from '@/components/ui/TimelineEntry';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function Experience() {
  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-800/50">
      <SectionWrapper id="experience">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              Career
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Professional Journey
            </h2>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto mt-12">
            {EXPERIENCE.map((entry, index) => (
              <TimelineEntry key={`${entry.company}-${entry.dateRange}`} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
