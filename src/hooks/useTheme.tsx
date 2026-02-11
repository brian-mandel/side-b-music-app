import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeName = "default" | "dark" | "brutalist-night";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "theme";

const VALID_THEMES: ThemeName[] = ["default", "dark", "brutalist-night"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_THEMES.includes(stored as ThemeName)) return stored as ThemeName;
    } catch {}
    return "default";
  });

  useEffect(() => {
    const root = document.documentElement;
    // Set data-theme attribute for CSS targeting
    root.dataset.theme = theme;
    // Manage dark class for Tailwind dark mode
    root.classList.remove("dark", "brutalist-night");
    if (theme === "dark" || theme === "brutalist-night") {
      root.classList.add("dark");
    }
    if (theme === "brutalist-night") {
      root.classList.add("brutalist-night");
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const setTheme = (t: ThemeName) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
