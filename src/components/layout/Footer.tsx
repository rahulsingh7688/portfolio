import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        {/* Name + tagline */}
        <p className="text-slate-300 font-semibold text-center">
          Rahul Singh · Senior Data Analyst &amp; AI Engineer
        </p>

        {/* Social links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors duration-200"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/rahulsingh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors duration-200"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:rahul@example.com"
            aria-label="Email"
            className="hover:text-white transition-colors duration-200"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-slate-500">
          © 2024 Rahul Singh. Built with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
