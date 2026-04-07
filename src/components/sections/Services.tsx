import { SERVICES } from '@/lib/data/services';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';

export function Services() {
  return (
    <div className="py-24 bg-slate-50 dark:bg-slate-800/50">
      <SectionWrapper id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              What I Do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Services I Offer
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From data strategy to production-ready AI — here&apos;s how I can help your business grow.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-12">
            <Button as="a" href="#contact" variant="primary" size="lg">
              Hire Me
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
