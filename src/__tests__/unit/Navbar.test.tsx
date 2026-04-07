import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/layout/Navbar';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...p}>{children}</div>,
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <section {...p}>{children}</section>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }) => <a {...p}>{children}</a>,
    button: ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button {...p}>{children}</button>,
    nav: ({ children, ...p }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <nav {...p}>{children}</nav>,
    header: ({ children, ...p }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <header {...p}>{children}</header>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({}),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
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

describe('Navbar', () => {
  it('renders all 7 nav link labels', () => {
    render(<Navbar />);
    const navLabels = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Services', 'Contact'];
    for (const label of navLabels) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('hamburger button renders with aria-label="Open menu"', () => {
    render(<Navbar />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('clicking hamburger opens mobile menu', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const hamburger = screen.getByRole('button', { name: /open menu/i });
    await user.click(hamburger);

    // After clicking, the mobile menu should appear (Close button or nav links in mobile menu)
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
  });
});
