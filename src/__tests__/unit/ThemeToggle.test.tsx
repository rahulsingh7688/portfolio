import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockSetTheme = vi.fn();
let mockTheme = 'light';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: mockTheme, setTheme: mockSetTheme }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...p}>{children}</div>,
    button: ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button {...p}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({}),
}));

beforeEach(() => {
  mockSetTheme.mockClear();
  mockTheme = 'light';

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

describe('ThemeToggle', () => {
  it('renders a button', async () => {
    const { default: ThemeToggle } = await import('@/components/layout/ThemeToggle');
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('clicking the button calls setTheme', async () => {
    const user = userEvent.setup();
    const { default: ThemeToggle } = await import('@/components/layout/ThemeToggle');
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button'));
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
  });

  it('when theme is "light", shows Moon icon (aria-label contains "dark")', async () => {
    mockTheme = 'light';
    const { default: ThemeToggle } = await import('@/components/layout/ThemeToggle');
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toMatch(/dark/i);
  });

  it('when theme is "dark", shows Sun icon (aria-label contains "light")', async () => {
    mockTheme = 'dark';
    const { default: ThemeToggle } = await import('@/components/layout/ThemeToggle');
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toMatch(/light/i);
  });
});
