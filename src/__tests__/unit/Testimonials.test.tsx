import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Testimonials } from '@/components/sections/Testimonials';
import { TESTIMONIALS } from '@/lib/data/testimonials';

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

describe('Testimonials', () => {
  it('all 3 testimonial names are present in the document', () => {
    render(<Testimonials />);
    for (const t of TESTIMONIALS) {
      expect(screen.getAllByText(t.name).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('all 3 quotes are present', () => {
    render(<Testimonials />);
    for (const t of TESTIMONIALS) {
      // The quote is wrapped in curly quotes in TestimonialCard
      expect(screen.getAllByText(new RegExp(t.quote.slice(0, 30), 'i')).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('prev/next navigation buttons are present', () => {
    render(<Testimonials />);
    expect(screen.getByRole('button', { name: /previous testimonial/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next testimonial/i })).toBeInTheDocument();
  });
});
