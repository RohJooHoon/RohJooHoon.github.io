'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './index.module.css';

function hasPreviousPage() {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const enteredElsewhere = navigation && new URL(navigation.name).pathname !== window.location.pathname;
  const internalReferrer = document.referrer && new URL(document.referrer).origin === window.location.origin;
  const remembered = window.history.state?.portfolioBack;
  return Boolean(enteredElsewhere || internalReferrer ||
    (remembered?.pathname === window.location.pathname && remembered.canGoBack));
}

export function BackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Preserve Next.js history fields and remember internal entry across reloads.
    window.history.replaceState({
      ...window.history.state,
      portfolioBack: { pathname, canGoBack: hasPreviousPage() },
    }, '');
  }, [pathname]);

  function goBack() {
    if (window.history.length > 1 && hasPreviousPage()) {
      router.back();
    } else {
      router.replace(fallbackHref);
    }
  }

  return (
    <button type="button" className={styles.button} onClick={goBack} aria-label="뒤로가기" title="뒤로가기">
      <span aria-hidden="true">&lt;</span>
    </button>
  );
}
