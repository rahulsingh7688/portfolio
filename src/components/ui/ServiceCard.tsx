import { BarChart3, Brain, Code2, Database, type LucideIcon } from 'lucide-react';
import type { Service } from '@/lib/data/services';

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, LucideIcon> = {
  BarChart3,
  Brain,
  Code2,
  Database,
};

export function ServiceCard({ service }: ServiceCardProps) {
  const { title, description, icon } = service;
  const Icon = iconMap[icon] ?? BarChart3;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
        <Icon
          size={24}
          className="text-indigo-600 dark:text-indigo-400"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
