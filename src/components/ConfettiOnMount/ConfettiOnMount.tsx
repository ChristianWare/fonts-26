// src/components/ConfettiOnMount/ConfettiOnMount.tsx
"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiOnMount() {
  useEffect(() => {
    const count = 200;
    const fire = (ratio: number, opts?: confetti.Options) => {
      confetti({
        particleCount: Math.floor(count * ratio),
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.5, y: 0.6 } });
    fire(0.2, { spread: 60, origin: { x: 0.5, y: 0.6 } });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      origin: { x: 0.5, y: 0.6 },
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      origin: { x: 0.5, y: 0.6 },
    });
    fire(0.1, { spread: 120, startVelocity: 45, origin: { x: 0.5, y: 0.6 } });
  }, []);

  return null;
}
