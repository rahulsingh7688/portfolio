import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from '@/components/sections/Experience';
import { EXPERIENCE } from '@/lib/data/experience';

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

describe('Experience', () => {
  it('all 4 entries render with title text visible', () => {
    render(<Experience />);
    for (const entry of EXPERIENCE) {
      expect(screen.getByText(entry.title)).toBeInTheDocument();
    }
  });

  it('current role entry shows "Current" badge', () => {
    render(<Experience />);
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('each entry shows company name and dateRange', () => {
    render(<Experience />);
    for (const entry of EXPERIENCE) {
      expect(screen.getByText(entry.company)).toBeInTheDocument();
      expect(screen.getByText(entry.dateRange)).toBeInTheDocument();
    }
  });
});
