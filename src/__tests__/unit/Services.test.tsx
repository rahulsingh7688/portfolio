import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Services } from '@/components/sections/Services';
import { SERVICES } from '@/lib/data/services';

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

describe('Services', () => {
  it('renders 4 service cards', () => {
    render(<Services />);
    expect(SERVICES).toHaveLength(4);
    for (const service of SERVICES) {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    }
  });

  it('all service titles are present', () => {
    render(<Services />);
    expect(screen.getByText('Data Analytics & Business Intelligence')).toBeInTheDocument();
    expect(screen.getByText('AI/ML Model Development')).toBeInTheDocument();
    expect(screen.getByText('Backend API Development')).toBeInTheDocument();
    expect(screen.getByText('Data Warehouse Design & Migration')).toBeInTheDocument();
  });

  it('"Hire Me" CTA has href="#contact"', () => {
    render(<Services />);
    const hireMe = screen.getByRole('link', { name: /hire me/i });
    expect(hireMe).toHaveAttribute('href', '#contact');
  });
});
