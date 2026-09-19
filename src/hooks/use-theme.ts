import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "lexi-ledger-theme";

const listeners = new Set<() => void>();

function readStored(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "light";
}

let current: Theme = readStored();

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function notify() {
  for (const listener of listeners) listener();
}

/** Viewport point the reveal animation grows from — usually the click. */
export interface ThemeOrigin {
  x: number;
  y: number;
}

export function setTheme(theme: Theme, origin?: ThemeOrigin) {
  const commit = () => {
    current = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    apply(theme);
    notify();
  };

  const canAnimate =
    origin !== undefined &&
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canAnimate) {
    commit();
    return;
  }

  const root = document.documentElement;
  root.style.setProperty("--theme-x", `${origin.x}px`);
  root.style.setProperty("--theme-y", `${origin.y}px`);

  document.startViewTransition(commit);
}

apply(current);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return current;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot);

  return {
    theme,
    setTheme: useCallback(
      (next: Theme, origin?: ThemeOrigin) => setTheme(next, origin),
      [],
    ),
  };
}
