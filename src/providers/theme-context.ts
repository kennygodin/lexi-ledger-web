import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const THEME_STORAGE_KEY = "theme";

export const ThemeProviderContext = createContext<ThemeProviderState | null>(
  null,
);
