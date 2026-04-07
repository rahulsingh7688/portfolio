'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const handleLinkClick = (href: string) => {
    onClose();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col"
        >
          {/* Header row */}
          <div className="flex items-center justify-end p-4">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col items-center justify-center flex-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="w-full text-center text-2xl font-semibold text-slate-900 dark:text-white py-4 border-b border-slate-100 dark:border-slate-800"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
