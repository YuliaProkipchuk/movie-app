import { useRef } from "react";

export function useDebounce() {
  const timer = useRef(0);
  function debounce(callback: () => void, delay: number) {
    clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      callback();
    }, delay);
  }

  return debounce;
}
