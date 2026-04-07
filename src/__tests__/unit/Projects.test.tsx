import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Projects } from '@/components/sections/Projects';

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

vi.mock('next/link', () => ({
  default: ({ href, children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: React.ReactNode }) => (
    <a href={href} {...p}>{children}</a>
  ),
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

describe('Projects', () => {
  it('"All" filter shows 5 project cards', () => {
    render(<Projects />);
    const caseStudyLinks = screen.getAllByText(/View Case Study/i);
    expect(caseStudyLinks.length).toBeGreaterThanOrEqual(5);
  });

  it('each visible card has a "View Case Study" link', () => {
    render(<Projects />);
    const links = screen.getAllByText(/View Case Study/i);
    links.forEach((link) => {
      expect(link.closest('a')).toHaveAttribute('href');
    });
  });

  it('clicking "AI" filter shows only AI-tagged projects', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole('button', { name: 'AI' }));

    // LaTeX OCR Model is the only AI-only project
    expect(screen.getByText('LaTeX OCR Model')).toBeInTheDocument();
    // FarmerPay+ is Backend only, should not be visible
    expect(screen.queryByText('FarmerPay+')).not.toBeInTheDocument();
    // Data Warehouse Modernization is Data only, should not be visible
    expect(screen.queryByText('Data Warehouse Modernization')).not.toBeInTheDocument();
  });

  it('clicking "Data" filter shows only Data-tagged projects', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole('button', { name: 'Data' }));

    // Data-tagged projects
    expect(screen.getByText('Data Warehouse Modernization')).toBeInTheDocument();
    expect(screen.getByText('Analytics Dashboard Platform')).toBeInTheDocument();
    expect(screen.getByText('Web Metrics Analytics System')).toBeInTheDocument();
    // AI-only project should not be visible
    expect(screen.queryByText('LaTeX OCR Model')).not.toBeInTheDocument();
    // Backend-only project should not be visible
    expect(screen.queryByText('FarmerPay+')).not.toBeInTheDocument();
  });
});
