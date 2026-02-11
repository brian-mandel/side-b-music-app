import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeName = "light" | "dark" | "brutalist-night";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "resonance-theme";

const THEME_CLASSES: Record<ThemeName, string> = {
  light: "",
  dark: "dark",
  "brutalist-night": "dark brutalist-night",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored in THEME_CLASSES) return stored as ThemeName;
    } catch {}
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove("dark", "brutalist-night");
    // Add new ones
    const classes = THEME_CLASSES[theme];
    if (classes) {
      classes.split(" ").forEach((c) => root.classList.add(c));
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
