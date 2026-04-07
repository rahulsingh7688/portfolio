import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Certifications } from '@/components/sections/Certifications';

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

describe('Certifications', () => {
  it('renders at least 2 certification entries', () => {
    render(<Certifications />);
    // Each cert has a name rendered as text
    expect(screen.getByText('Google Associate Data Analyst')).toBeInTheDocument();
    expect(screen.getByText('Data Warehouse Management Certification')).toBeInTheDocument();
  });

  it('"Google Associate Data Analyst" text is present', () => {
    render(<Certifications />);
    expect(screen.getByText('Google Associate Data Analyst')).toBeInTheDocument();
  });

  it('"Data Warehouse Management Certification" text is present', () => {
    render(<Certifications />);
    expect(screen.getByText('Data Warehouse Management Certification')).toBeInTheDocument();
  });

  it('"Verify Credential →" link has target="_blank"', () => {
    render(<Certifications />);
    const verifyLink = screen.getByRole('link', { name: /verify credential/i });
    expect(verifyLink).toHaveAttribute('target', '_blank');
  });
});
