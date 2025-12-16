// components/AppShell.tsx
"use client";

import styles from './AppShell.module.css'
import { useEffect, useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay — replace with real logic if you want
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.appShell}>
      {isLoading && (
        <div className={styles.preloader}>
          <div className={styles.preloaderInner}>
            <div className={styles.loaderLogo}>F&F</div>
            <p className={styles.loaderText}>Wiring in your booking flow…</p>
          </div>
        </div>
      )}

      {/* Content fades in after loader */}
      <div
        className={`${styles.pageContent} ${isLoading ? styles.pageContentHidden : styles.pageContentVisible}`}
      >
        {children}
      </div>
    </div>
  );
}
