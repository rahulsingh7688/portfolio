import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from '@/components/sections/Skills';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...p}>{children}</div>,
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <section {...p}>{children}</section>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }) => <a {...p}>{children}</a>,
    button: ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button {...p}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({}),
}));

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  global.IntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  })) as unknown as typeof IntersectionObserver;
});

describe('Skills', () => {
  it('renders all 4 category headings', () => {
    render(<Skills />);
    expect(screen.getByText('Data & Analytics')).toBeInTheDocument();
    expect(screen.getByText('AI / Machine Learning')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('Cloud & Infrastructure')).toBeInTheDocument();
  });

  it('renders all required skills', () => {
    render(<Skills />);
    const requiredSkills = [
      'Python', 'SQL', 'Spark', 'Hive', 'TensorFlow', 'NLP',
      'Django', 'REST APIs', 'JWT Auth', 'Plotly Dash', 'Next.js', 'Data Warehousing',
    ];
    for (const skill of requiredSkills) {
      expect(screen.getByText(skill)).toBeInTheDocument();
    }
  });

  it('each skill has a proficiency indicator element (bar div)', () => {
    render(<Skills />);
    // The proficiency bar has aria-label like "Python: Expert"
    const proficiencyBars = document.querySelectorAll('[aria-label]');
    const skillBars = Array.from(proficiencyBars).filter((el) =>
      el.getAttribute('aria-label')?.includes(':')
    );
    expect(skillBars.length).toBeGreaterThan(0);
  });

  it('certifications section renders', () => {
    render(<Skills />);
    expect(screen.getByText('Certifications')).toBeInTheDocument();
  });
});
