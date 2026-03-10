import { useState, useEffect, useRef } from "react";

interface UseAutoProgressOptions {
  isActive: boolean;
  durationMs?: number;
  intervalMs?: number;
  delayAfterComplete?: number;
  onComplete: () => void;
}

export function useAutoProgress({
  isActive,
  durationMs = 4000,
  intervalMs = 100,
  delayAfterComplete = 800,
  onComplete,
}: UseAutoProgressOptions) {
  const [progress, setProgress] = useState(0);
  const hasAdvanced = useRef(false);
  const increment = 100 / (durationMs / intervalMs);

  // Reset when becoming active
  useEffect(() => {
    if (isActive) {
      setProgress(0);
      hasAdvanced.current = false;
    }
  }, [isActive]);

  // Tick progress
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(p + increment, 100);
      });
    }, intervalMs);
    return () => clearInterval(interval);
  }, [isActive, increment, intervalMs]);

  // Auto-advance after complete
  useEffect(() => {
    if (progress >= 100 && !hasAdvanced.current && isActive) {
      hasAdvanced.current = true;
      const timer = setTimeout(() => onComplete(), delayAfterComplete);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete, isActive, delayAfterComplete]);

  return progress;
}
