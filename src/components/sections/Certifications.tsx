import { CERTIFICATIONS } from '@/lib/data/certifications';
import { CertBadge } from '@/components/ui/CertBadge';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function Certifications() {
  return (
    <div className="py-24 bg-white dark:bg-slate-900">
      <SectionWrapper id="certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              Credentials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Certifications
            </h2>
          </div>

          {/* Certifications grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-10">
            {CERTIFICATIONS.map((cert) => (
              <CertBadge key={cert.name} cert={cert} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
