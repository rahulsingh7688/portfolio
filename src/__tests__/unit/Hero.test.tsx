import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...p}>{children}</div>,
    section: ({ children, ...p }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <section {...p}>{children}</section>,
    a: ({ children, ...p }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children?: React.ReactNode }) => <a {...p}>{children}</a>,
    button: ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button {...p}>{children}</button>,
    h1: ({ children, ...p }: React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode }) => <h1 {...p}>{children}</h1>,
    p: ({ children, ...p }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) => <p {...p}>{children}</p>,
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
});

describe('Hero', () => {
  it('renders H1 with correct headline text', () => {
    render(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toContain('I Build Scalable');
    expect(h1.textContent).toContain('Data Systems');
    expect(h1.textContent).toContain('AI-Powered Solutions');
  });

  it('renders subtitle text', () => {
    render(<Hero />);
    expect(
      screen.getByText(/Senior Data Analyst.*AI Engineer.*9\+ Years Experience/i)
    ).toBeInTheDocument();
  });

  it('"Hire Me" link has href="#contact"', () => {
    render(<Hero />);
    const hireMe = screen.getByRole('link', { name: /hire me/i });
    expect(hireMe).toHaveAttribute('href', '#contact');
  });

  it('"View My Work" link has href="#projects"', () => {
    render(<Hero />);
    const viewWork = screen.getByRole('link', { name: /view my work/i });
    expect(viewWork).toHaveAttribute('href', '#projects');
  });

  it('Resume link has href="/resume.pdf" and download attribute', () => {
    render(<Hero />);
    const resumeLink = screen.getByRole('link', { name: /download resume/i });
    expect(resumeLink).toHaveAttribute('href', '/resume.pdf');
    expect(resumeLink).toHaveAttribute('download');
  });

  it('GitHub link is present with correct href', () => {
    render(<Hero />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com');
  });

  it('LinkedIn link is present with correct href', () => {
    render(<Hero />);
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/rahulsingh');
  });
});
