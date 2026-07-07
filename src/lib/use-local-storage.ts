"use client";

import { useCallback, useSyncExternalStore } from "react";

// 同一タブ内での更新を購読者へ通知するためのカスタムイベント
const LOCAL_STORAGE_EVENT = "local-storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCAL_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCAL_STORAGE_EVENT, callback);
  };
}

// getSnapshot はプリミティブ（string | null）を返すこと。
// オブジェクトを返すと参照が毎回変わり再レンダリングが無限ループする。
export function useLocalStorageString(
  key: string
): [string | null, (value: string) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null
  );

  const setValue = useCallback(
    (next: string) => {
      localStorage.setItem(key, next);
      window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
    },
    [key]
  );

  return [value, setValue];
}
