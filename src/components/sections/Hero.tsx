'use client';

import { motion } from 'framer-motion';
import { Sparkles, Github, Linkedin, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/20"
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-400 opacity-20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-violet-400 opacity-20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={childVariants}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
            <Sparkles size={16} aria-hidden="true" />
            Available for Freelance &amp; Full-time Roles
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6"
          variants={childVariants}
        >
          I Build Scalable{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Data Systems
          </span>{' '}
          &amp; AI-Powered Solutions
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-slate-600 dark:text-slate-400 mb-4"
          variants={childVariants}
        >
          Senior Data Analyst &amp; AI Engineer · 9+ Years Experience
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base text-slate-500 dark:text-slate-500 max-w-2xl mx-auto mb-10"
          variants={childVariants}
        >
          Turning complex data into business decisions. From AI models to data warehouses, I build
          systems that scale.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          variants={childVariants}
        >
          <Button as="a" href="#contact" variant="primary" size="lg">
            Hire Me
          </Button>
          <Button as="a" href="#projects" variant="secondary" size="lg">
            View My Work
          </Button>
          <Button as="a" href="/resume.pdf" download variant="ghost" size="lg">
            <Download size={18} className="mr-2" aria-hidden="true" />
            Download Resume
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-6 text-slate-500"
          variants={childVariants}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
          >
            <Github size={18} aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rahulsingh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
          >
            <Linkedin size={18} aria-hidden="true" />
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs">
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
