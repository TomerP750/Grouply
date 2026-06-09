
import { useContext, createContext, useState, type ReactNode, useCallback, useMemo, useEffect } from "react";

type Theme = "dark" | "light";

type ThemeState = {
    theme: Theme
};

type ThemeContextValue = ThemeState & {
    toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode
};


const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {

    if (typeof window === "undefined") return "light";
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "dark" || stored === "light") return stored;
    } catch {
        /* ignore */
    }
    const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
}

function applyHtmlClass(theme: Theme) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
}



export function ThemeProvider({ children }: ThemeProviderProps) {

    const [theme, setTheme] = useState<Theme>(getInitialTheme());


    useEffect(() => {
        applyHtmlClass(theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {

        }
    }, [theme]);

    
    const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : 'dark')), []);

    const ctx = useMemo(() => ({ theme, toggle }), [theme]);
    
    return (
        <ThemeContext.Provider value={ctx}>
            {children}
        </ThemeContext.Provider>
    )
};

export function useTheme() {

    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("error with useTheme");
    }
    return ctx;

};