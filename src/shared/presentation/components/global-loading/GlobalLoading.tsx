import { Progress } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function GlobalLoading() {
  const [progress, setProgress] = useState(0);
  const [hideProgress, setHideProgress] = useState(true);
  const router = useRouter();
  useEffect(() => {
    let resetProgress: NodeJS.Timeout;
    let resetHide: NodeJS.Timeout;
    const onRouteChangeStart = () => {
      setHideProgress(() => false);
      setProgress(() => 40);
    };
    const onRouteChangeComplete = () => {
      setProgress(() => 100);
      resetProgress = setTimeout(() => {
        setProgress(0);
        resetHide = setTimeout(() => {
          setHideProgress(true);
        }, 1000);
      }, 400);
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      clearTimeout(resetProgress);
      clearTimeout(resetHide);
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);
  return (
    <Progress
      style={{ position: 'fixed', zIndex: 2, width: '100%', top: 0 }}
      value={progress}
      radius={0}
      h={4}
      animated
      color="purple"
      hidden={hideProgress}
    />
  );
}
