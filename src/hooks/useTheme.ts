import { useThemeStore } from '../store/useThemeStore';

const useTheme = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return isDarkMode ? 'dark' : 'light';
};

export default useTheme;
