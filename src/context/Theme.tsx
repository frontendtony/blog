import { createContext, ReactChild, ReactElement, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export default function ThemeProvider({ children }: { children: ReactChild }): ReactElement {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = (): void => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
