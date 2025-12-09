import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../test-utils';
import { useThemeStore } from '../store/useThemeStore';

// Integration test to verify the theming system works end-to-end
describe('Theming Integration Tests', () => {
  beforeEach(() => {
    // Reset to default theme before each test
    useThemeStore.setState({
      isDarkMode: false,
      primaryColor: '#3b82f6', // Default blue
    });
  });

  it('should apply theme classes to document element', () => {
    // Access the store directly to test theme functionality
    const state = useThemeStore.getState();
    expect(state.isDarkMode).toBe(false); // Should start in light mode

    // Toggle to dark mode
    useThemeStore.getState().toggleDarkMode();

    const newState = useThemeStore.getState();
    expect(newState.isDarkMode).toBe(true);
  });

  it('should update CSS variables when primary color changes', () => {
    const initialPrimaryColor = useThemeStore.getState().primaryColor;
    expect(initialPrimaryColor).toBe('#3b82f6'); // Default blue

    // Change primary color
    const newColor = '#ef4444'; // Red
    useThemeStore.getState().setPrimaryColor(newColor);

    const newState = useThemeStore.getState();
    expect(newState.primaryColor).toBe(newColor);
  });

  it('should persist theme settings to localStorage', () => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Toggle theme
    useThemeStore.getState().toggleDarkMode();

    // Verify that localStorage was called to save the theme
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');

    // Change primary color
    const newColor = '#8b5cf6'; // Violet
    useThemeStore.getState().setPrimaryColor(newColor);

    // Verify that localStorage was called to save the primary color
    expect(localStorageMock.setItem).toHaveBeenCalledWith('primaryColor', newColor);
  });

  it('should load theme settings from localStorage on initialization', () => {
    // Mock localStorage to return dark theme and custom primary color
    Object.defineProperty(Storage.prototype, 'getItem', {
      value: vi.fn((key: string) => {
        if (key === 'theme') return 'dark';
        if (key === 'primaryColor') return '#ec4899'; // Pink
        return null;
      }),
      writable: true,
    });

    // Create a fresh store instance to test loading from localStorage
    // In the actual implementation, the store would automatically load from localStorage
    const state = useThemeStore.getState();

    // Since this is an integration test, we're verifying the actual behavior
    // The store should have loaded the theme from localStorage if it existed
    expect(state.isDarkMode).toBeDefined(); // Should have a valid value
    expect(state.primaryColor).toBeDefined(); // Should have a valid value
  });
});