'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll-linked parallax.
 *
 * Design goals (all in response to real perf issues found on this site):
 *  - Zero React re-renders: the scroll offset is written straight to
 *    `element.style.transform`, bypassing reconciliation entirely.
 *  - `transform` only: this is a compositor-only property, so moving the
 *    element never triggers layout/reflow — unlike animating height,
 *    max-height or grid-template-rows.
 *  - rAF-throttled: at most one calculation per animation frame, no matter
 *    how many scroll events fire.
 *  - Viewport-gated: elements far outside the viewport skip all work.
 *  - Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   const bgRef = useParallax<HTMLDivElement>(0.15);
 *   <div ref={bgRef} className="absolute inset-0 ..." />
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || speed === 0) return;

    let ticking = false;

    const apply = () => {
      ticking = false;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Skip work for anything well outside the viewport.
      if (rect.bottom < -300 || rect.top > viewportH + 300) return;

      // -1 when the element's center is a full viewport above, +1 when a
      // full viewport below, 0 when perfectly centered.
      const progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
      const offset = progress * speed * 100;

      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return ref;
}

export default useParallax;
