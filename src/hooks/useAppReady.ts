import { useEffect, useState } from 'react';

import { getHasSeenWelcome } from '@/storage/preferences';

export function useAppReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      await getHasSeenWelcome();

      if (isMounted) {
        setIsReady(true);
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  return isReady;
}
