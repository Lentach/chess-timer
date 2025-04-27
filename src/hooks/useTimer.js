import { useState, useRef, useEffect, useCallback } from 'react';

export default function useTimer(initialSeconds, { onExpire } = {}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start the timer
  const start = useCallback(() => {
    if (!isRunning && seconds > 0) setIsRunning(true);
  }, [isRunning, seconds]);

  // Pause the timer
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset the timer
  const reset = useCallback((newSeconds = initialSeconds) => {
    setIsRunning(false);
    setSeconds(newSeconds);
  }, [initialSeconds]);

  // Set the timer to a specific value
  const set = useCallback((newSeconds) => {
    setIsRunning(false);
    setSeconds(newSeconds);
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (onExpire) onExpire();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds, onExpire]);

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    set,
  };
} 