"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

const FuriganaContext = createContext<{
  furigana: boolean;
  toggleFurigana: () => void;
}>({
  furigana: false,
  toggleFurigana: () => {},
});

export function FuriganaProvider({ children }: { children: ReactNode }) {
  const [furigana, setFurigana] = useState(false);

  useEffect(() => {
    setFurigana(localStorage.getItem("furigana") === "true");
  }, []);

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
