import { useCallback, useState } from 'react';

export const useFetch = (callback: (page: number) => Promise<void>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      await callback(page);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [callback]);
  return [fetching, isLoading, error] as const;
};
