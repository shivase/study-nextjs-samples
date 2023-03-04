import { useTheme } from 'next-themes';

export default () => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return {
    currentTheme,
    setTheme,
  };
};
