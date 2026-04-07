import { Award, Database, type LucideIcon } from 'lucide-react';
import type { Certification } from '@/lib/data/certifications';

interface CertBadgeProps {
  cert: Certification;
}

const iconMap: Record<string, LucideIcon> = {
  Award,
  Database,
};

export function CertBadge({ cert }: CertBadgeProps) {
  const { name, org, year, verifyUrl, icon } = cert;
  const Icon = iconMap[icon] ?? Award;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex items-start gap-4">
      {/* Icon area */}
      <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center flex-shrink-0">
        <Icon size={24} className="text-amber-600" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="text-sm text-slate-500">{org}</p>
        <p className="text-xs text-slate-400">{year}</p>

        {verifyUrl && (
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Verify Credential →
          </a>
        )}
      </div>
    </div>
  );
}
