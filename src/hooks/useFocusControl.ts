import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'input:not([disabled]), button:not([disabled]), a[href], textarea:not([disabled]), select:not([disabled])';

export default function useFocusControl() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusableElements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusableElements[0] ?? container).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (focusableElements.length < 1) return;

      const lastFocusableIndex = focusableElements.length - 1;

      const isFirst = document.activeElement === focusableElements[0];
      const isLast = document.activeElement === focusableElements[lastFocusableIndex];

      if (e.key === 'Tab') {
        if ((e.shiftKey && isFirst) || (!e.shiftKey && isLast)) {
          e.preventDefault();
          focusableElements[e.shiftKey ? lastFocusableIndex : 0].focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  return containerRef;
}
