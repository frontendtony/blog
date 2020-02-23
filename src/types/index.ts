export interface ThemeObject {
  [key: string]: string;
}

export type Theme = 'light' | 'dark' | null;

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
