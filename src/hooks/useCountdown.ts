import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
  totalRemainingMs: number;
}

/**
 * Custom hook to calculate a live countdown to an exact target datetime (with timezone offset)
 * Handles timezone offsets reliably by comparing absolute UTC timestamps.
 */
export function useCountdown(targetIsoDateTime: string): CountdownResult {
  // Parse target timestamp once. When ISO has "+05:30", Date.parse gets the exact Unix epoch ms.
  const targetTime = new Date(targetIsoDateTime).getTime();

  const calculateTimeLeft = (): CountdownResult => {
    const now = Date.now();
    const difference = targetTime - now;

    if (isNaN(targetTime) || difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
        totalRemainingMs: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isCompleted: false,
      totalRemainingMs: difference,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(calculateTimeLeft);

  useEffect(() => {
    // Immediate calculation to prevent initial flash
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (updated.isCompleted) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetIsoDateTime]);

  return timeLeft;
}
