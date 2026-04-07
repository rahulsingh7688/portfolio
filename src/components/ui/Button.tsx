'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold',
  secondary:
    'border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg font-semibold',
  ghost:
    'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[44px]',
};

// Conflicting event props that Framer Motion redefines with incompatible signatures
type ConflictingProps =
  | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver'
  | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps | ConflictingProps> & {
    as?: 'button';
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | ConflictingProps> & {
    as: 'a';
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const motionTransition = { duration: 0.2 };

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  as,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center transition-colors cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (as === 'a') {
    const { ...anchorProps } = rest as Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      ConflictingProps
    >;
    return (
      <motion.a
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={motionTransition}
        {...anchorProps}
      >
        {children}
      </motion.a>
    );
  }

  const { ...buttonProps } = rest as Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    ConflictingProps
  >;
  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={motionTransition}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
}
