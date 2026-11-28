'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Shared dialog focus management for the gallery overlays (rendered inline,
 * without portals): moves initial focus onto the dialog surface, closes on
 * Escape, traps Tab / Shift+Tab inside the dialog and restores focus to the
 * element that opened it once the dialog closes.
 */
export function useDialogFocus(open: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;

    const activeElement = document.activeElement;
    previouslyFocusedRef.current =
      activeElement instanceof HTMLElement ? activeElement : null;

    const panel = dialogRef.current;
    if (panel) panel.focus();

    const visibleFocusableInPanel = (): HTMLElement[] => {
      const container = dialogRef.current;
      if (!container) return [];
      return Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => element.getClientRects().length > 0);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const container = dialogRef.current;
      if (!container) return;

      const focusable = visibleFocusableInPanel();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;
      const isInside =
        current instanceof Node && container.contains(current);

      if (!first || !last) {
        event.preventDefault();
        container.focus();
        return;
      }

      if (event.shiftKey) {
        if (!isInside || current === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!isInside || current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const previous = previouslyFocusedRef.current;
      if (previous && previous.isConnected) {
        previous.focus();
      }
    };
  }, [open]);

  return dialogRef;
}
