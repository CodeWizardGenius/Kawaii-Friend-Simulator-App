import React from "react";

export type ThemeMode = "light" | "dark";

type ThemeCtx = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = React.createContext<ThemeCtx | undefined>(undefined);

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<ThemeMode>("light");
  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
