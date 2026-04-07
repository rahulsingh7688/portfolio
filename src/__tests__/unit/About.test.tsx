import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from '@/components/sections/About';

vi.mock('next/image', () => ({
  default: ({ src, alt, ...p }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) => (
    <img src={src} alt={alt} {...p} />
  ),
}));

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
});

describe('About', () => {
  it('renders at least 3 achievement list items', () => {
    render(<About />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThanOrEqual(3);
  });

  it('profile image has non-empty alt text', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt');
    expect(img.getAttribute('alt')).not.toBe('');
  });

  it('"Hire Me" CTA is present with href="#contact"', () => {
    render(<About />);
    const hireMe = screen.getByRole('link', { name: /hire me/i });
    expect(hireMe).toBeInTheDocument();
    expect(hireMe).toHaveAttribute('href', '#contact');
  });

  it('section heading renders', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
