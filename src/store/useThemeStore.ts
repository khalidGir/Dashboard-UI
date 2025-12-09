import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
  toggleDarkMode: () => void;
  setPrimaryColor: (color: string) => void;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== 'undefined') {
    const storedPreference = localStorage.getItem('theme');
    if (storedPreference === 'dark') {
      return true;
    }
    if (storedPreference === 'light') {
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; // Default to light mode on server-side or if window is undefined
};

const getInitialPrimaryColor = (): string => {
  if (typeof window !== 'undefined') {
    const storedColor = localStorage.getItem('primaryColor');
    if (storedColor) {
      return storedColor;
    }
  }
  return '#3b82f6'; // Default blue-500
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: getInitialDarkMode(),
  primaryColor: getInitialPrimaryColor(),
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      return { isDarkMode: newDarkMode };
    }),
  setPrimaryColor: (color: string) =>
    set(() => {
      localStorage.setItem('primaryColor', color);
      // Update the CSS variable to apply theme changes immediately
      document.documentElement.style.setProperty('--color-primary', color);

      // Update the primary-darker variable as well (darker shade)
      const darkerColor = shadeColor(color, -20);
      document.documentElement.style.setProperty('--color-primary-darker', darkerColor);

      return { primaryColor: color };
    }),
}));

// Helper function to generate a darker shade of a color
const shadeColor = (color: string, percent: number): string => {
  // Handle hex colors
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + R * percent / 100));
  G = Math.min(255, Math.max(0, G + G * percent / 100));
  B = Math.min(255, Math.max(0, B + B * percent / 100));

  const RR = Math.round(R).toString(16).padStart(2, '0');
  const GG = Math.round(G).toString(16).padStart(2, '0');
  const BB = Math.round(B).toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
};
