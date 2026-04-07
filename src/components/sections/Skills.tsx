import { SKILLS } from '@/lib/data/skills';
import { CERTIFICATIONS } from '@/lib/data/certifications';
import { SkillBadge } from '@/components/ui/SkillBadge';
import { CertBadge } from '@/components/ui/CertBadge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const categoryDotColors: Record<string, string> = {
  'Data & Analytics': 'bg-indigo-500',
  'AI / Machine Learning': 'bg-violet-500',
  'Backend Development': 'bg-emerald-500',
  'Cloud & Infrastructure': 'bg-amber-500',
};

export function Skills() {
  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-800/50">
      <SectionWrapper id="skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              Skills &amp; Expertise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              My Technical Toolkit
            </h2>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {SKILLS.map((category) => {
              const dotColor = categoryDotColors[category.category] ?? 'bg-slate-500';
              return (
                <div
                  key={category.category}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColor}`}
                      aria-hidden="true"
                    />
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                      {category.category}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, index) => (
                      <SkillBadge key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-center mb-6">
              Certifications
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="w-full max-w-sm">
                  <CertBadge cert={cert} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
