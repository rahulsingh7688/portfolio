'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimationVariant = 'fadeUp' | 'fadeIn' | 'stagger';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  animationVariant?: AnimationVariant;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const noAnimationVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

const variantMap: Record<AnimationVariant, Variants> = {
  fadeUp: fadeUpVariants,
  fadeIn: fadeInVariants,
  stagger: staggerVariants,
};

export function SectionWrapper({
  id,
  children,
  className,
  animationVariant = 'fadeUp',
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  const variants = reducedMotion ? noAnimationVariants : variantMap[animationVariant];

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.section>
  );
}
