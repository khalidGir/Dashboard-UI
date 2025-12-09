import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useThemeStore } from '../store/useThemeStore';

const ThemeToggle: React.FC = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-bg-tertiary dark:bg-bg-tertiary text-text-primary dark:text-text-primary"
    >
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
