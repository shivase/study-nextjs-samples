import { useTheme } from 'next-themes';

const useThemes = () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return {
    currentTheme,
    setTheme,
  };
};

export default useThemes;
