import { useMemo } from 'react';

interface AnimationOptions {
  reduceMotion?: boolean;
  duration?: number;
  delay?: number;
  easing?: string;
}

export const useOptimizedAnimation = (options: AnimationOptions = {}) => {
  const {
    reduceMotion = false,
    duration = 0.3,
    delay = 0,
    easing = 'easeOut'
  } = options;

  // Проверяем системные настройки reduce motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const shouldReduceMotion = reduceMotion || prefersReducedMotion;

  const pageTransition = useMemo(() => ({
    initial: shouldReduceMotion 
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.98 },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, scale: 1 },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 1.02 },
    transition: {
      duration: shouldReduceMotion ? 0.1 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easing,
    }
  }), [shouldReduceMotion, duration, delay, easing]);

  const fadeIn = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: shouldReduceMotion ? 0.1 : duration,
      delay: shouldReduceMotion ? 0 : delay,
    }
  }), [shouldReduceMotion, duration, delay]);

  const slideUp = useMemo(() => ({
    initial: shouldReduceMotion 
      ? { opacity: 0 }
      : { opacity: 0, y: 20 },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0.1 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easing,
    }
  }), [shouldReduceMotion, duration, delay, easing]);

  const scaleIn = useMemo(() => ({
    initial: shouldReduceMotion 
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.9 },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, scale: 1 },
    transition: {
      duration: shouldReduceMotion ? 0.1 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: easing,
    }
  }), [shouldReduceMotion, duration, delay, easing]);

  return {
    pageTransition,
    fadeIn,
    slideUp,
    scaleIn,
    shouldReduceMotion,
    prefersReducedMotion,
  };
}; 