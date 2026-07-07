"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { useLocalStorageString } from "@/lib/use-local-storage";

const FuriganaContext = createContext<{
  furigana: boolean;
  toggleFurigana: () => void;
}>({
  furigana: false,
  toggleFurigana: () => {},
});

export function FuriganaProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useLocalStorageString("furigana");
  const furigana = stored === "true";

  const toggleFurigana = useCallback(() => {
    setStored(String(!furigana));
  }, [furigana, setStored]);

  return (
    <FuriganaContext.Provider value={{ furigana, toggleFurigana }}>
      {children}
    </FuriganaContext.Provider>
  );
}

export function useFurigana() {
  return useContext(FuriganaContext);
}
