'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data/testimonials';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div className="py-24 bg-white dark:bg-slate-900">
      <SectionWrapper id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              Social Proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              What People Say
            </h2>
          </div>

          {/* Mobile: single card with prev/next */}
          <div className="md:hidden">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.3 }}
                >
                  <TestimonialCard testimonial={TESTIMONIALS[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span className="text-sm text-slate-500">
                {currentIndex + 1} / {TESTIMONIALS.length}
              </span>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop: all cards in a grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
