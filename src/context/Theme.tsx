import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { Theme, ThemeContextType, ThemeObject } from '../types';

const themes = {
  dark: {
    primary: '#1ca086',
    textColor: 'white',
    backgroundColor: '#1d3a48',
    secondaryBackgroundColor: '#0d1219',
    blockquoteColor: 'rgba(255,255,255,0.20)',
    icon: 'white'
  },
  light: {
    primary: '#1ca086',
    textColor: 'black',
    backgroundColor: '#cbdde4',
    secondaryBackgroundColor: '#EDF2F7',
    blockquoteColor: 'rgba(0,0,0,0.80)',
    icon: '#0d1219'
  }
};

const setCSSVariables = (properties: ThemeObject) => {
  for (const property in properties) {
    document.documentElement.style.setProperty(`--${property}`, properties[property]);
  }
};

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(null);

  useLayoutEffect(() => {
    const previouslySelectedTheme = localStorage.getItem('theme') as Theme;

    // use the previously selected theme and default to light if none was selected
    if (previouslySelectedTheme) {
      setTheme(previouslySelectedTheme);
    } else {
      setTheme('light');
    }
  }, []);

  useLayoutEffect(() => {
    if (theme) {
      // set the custom properties for use in styles
      setCSSVariables(themes[theme]);
    }
  }, [theme]);

  const toggleTheme = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  if (theme === null) return null;

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
