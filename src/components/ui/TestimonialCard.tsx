import { Quote } from 'lucide-react';
import type { Testimonial } from '@/lib/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, role, company, quote } = testimonial;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-indigo-500 dark:text-indigo-400 flex-shrink-0" aria-hidden="true" />

      {/* Quote text */}
      <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div
          className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-sm font-semibold flex-shrink-0"
          aria-hidden="true"
        >
          {getInitials(name)}
        </div>

        <div>
          <p className="font-semibold text-slate-900 dark:text-white text-sm">{name}</p>
          <p className="text-sm text-slate-500">
            {role} · {company}
          </p>
        </div>
      </div>
    </div>
  );
}
