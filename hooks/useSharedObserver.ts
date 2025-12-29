'use client';

import { useEffect, useRef, useState } from 'react';

// Singleton para compartir un único IntersectionObserver
class SharedIntersectionObserver {
  private observer: IntersectionObserver | null = null;
  private callbacks = new Map<Element, (isIntersecting: boolean) => void>();
  private defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  constructor(options?: IntersectionObserverInit) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = this.callbacks.get(entry.target);
            if (callback) {
              callback(entry.isIntersecting);
            }
          });
        },
        this.defaultOptions
      );
    }
  }

  observe(element: Element, callback: (isIntersecting: boolean) => void) {
    if (!this.observer) return;
    this.callbacks.set(element, callback);
    this.observer.observe(element);
  }

  unobserve(element: Element) {
    if (!this.observer) return;
    this.callbacks.delete(element);
    this.observer.unobserve(element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.callbacks.clear();
    }
  }
}

// Instancia global compartida
let sharedObserverInstance: SharedIntersectionObserver | null = null;

function getSharedObserver(options?: IntersectionObserverInit): SharedIntersectionObserver {
  if (typeof window === 'undefined') {
    // SSR fallback - crear instancia que no hace nada
    return new SharedIntersectionObserver(options);
  }

  if (!sharedObserverInstance) {
    sharedObserverInstance = new SharedIntersectionObserver(options);
  }
  return sharedObserverInstance;
}

export function useSharedObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getSharedObserver(options);
    
    const callback = (isIntersecting: boolean) => {
      if (isIntersecting) {
        setIsVisible(true);
        // Auto-unobserve después de ser visible (optimización)
        observer.unobserve(element);
      }
    };

    observer.observe(element, callback);

    return () => {
      observer.unobserve(element);
    };
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isVisible };
}

