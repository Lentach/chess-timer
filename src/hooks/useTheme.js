import { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  return mql.matches ? 'dark' : 'light';
}

export default function useTheme() {
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
} 