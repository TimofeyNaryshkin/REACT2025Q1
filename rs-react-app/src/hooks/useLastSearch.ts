import { useEffect, useState } from 'react';

export const useLastSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch') || '';
    if (lastSearch) {
      setSearchQuery(lastSearch);
    }
  }, []);

  return [searchQuery, setSearchQuery] as const;
};

export default useLastSearch;
