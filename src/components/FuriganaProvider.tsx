"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const FuriganaContext = createContext<{
  furigana: boolean;
  toggleFurigana: () => void;
}>({
  furigana: false,
  toggleFurigana: () => {},
});

function getStoredFurigana() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("furigana") === "true";
}

const subscribe = () => () => {};

export function FuriganaProvider({ children }: { children: ReactNode }) {
  const initialValue = useSyncExternalStore(
    subscribe,
    getStoredFurigana,
    () => false
  );
  const [furigana, setFurigana] = useState(initialValue);

  const toggleFurigana = useCallback(() => {
    setFurigana((prev) => {
      const next = !prev;
      localStorage.setItem("furigana", String(next));
      return next;
    });
  }, []);

  return (
    <FuriganaContext.Provider value={{ furigana, toggleFurigana }}>
      {children}
    </FuriganaContext.Provider>
  );
}

export function useFurigana() {
  return useContext(FuriganaContext);
}
