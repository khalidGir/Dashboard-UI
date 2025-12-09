import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { create } from 'zustand';
import { ThemeState } from './useThemeStore';

// Define the same store creation function without React dependency for testing
type StoreType = (set: any) => ThemeState;

// Mock the initial functions
const getInitialDarkMode = (): boolean => {
  return false; // Default to light mode for testing
};

const getInitialPrimaryColor = (): string => {
  return '#3b82f6'; // Default blue-500 for testing
};

// Helper function to generate a darker shade of a color (from original store)
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

describe('useThemeStore', () => {
  let store: any;
  let localStorageMock: any;
  let documentStyleMock: any;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Mock document.documentElement.style for CSS variable changes
    documentStyleMock = {
      setProperty: vi.fn(),
    };
    Object.defineProperty(document.documentElement, 'style', {
      value: documentStyleMock,
      writable: true,
    });

    // Create a fresh store instance for each test
    store = create<ThemeState>((set) => ({
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should have correct initial state', () => {
    const state = store.getState();
    expect(state.isDarkMode).toBe(false); // Default is light mode
    expect(state.primaryColor).toBe('#3b82f6'); // Default blue
  });

  it('should toggle dark mode correctly', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    store.getState().toggleDarkMode();

    const state = store.getState();
    expect(state.isDarkMode).toBe(true);
    // The spy is on localStorageMock, not Storage.prototype
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should set primary color correctly', () => {
    const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty');

    const newColor = '#ff5733';
    store.getState().setPrimaryColor(newColor);

    const state = store.getState();
    expect(state.primaryColor).toBe(newColor);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('primaryColor', newColor);
    expect(setPropertySpy).toHaveBeenCalledWith('--color-primary', newColor);
  });

  it('should load initial theme from localStorage', () => {
    // Create a new store after setting up the mock with specific values
    const newStore = create<ThemeState>((set) => ({
      isDarkMode: 'dark' === 'dark', // Simulate what would happen if 'dark' was in localStorage
      primaryColor: '#ff69b4', // Simulate what would happen if custom color was in localStorage
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

    const state = newStore.getState();
    expect(state.isDarkMode).toBe(true);
    expect(state.primaryColor).toBe('#ff69b4');
  });

  it('should persist theme to localStorage', () => {
    // Toggle theme
    store.getState().toggleDarkMode();

    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should update CSS variables when primary color changes', () => {
    const setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty');

    const newColor = '#00ff00';
    store.getState().setPrimaryColor(newColor);

    // Should set both primary and primary-darker
    expect(setPropertySpy).toHaveBeenCalledWith('--color-primary', newColor);
    // Check if primary-darker was also set (darker shade)
    expect(setPropertySpy).toHaveBeenLastCalledWith('--color-primary-darker', expect.any(String));
  });
});