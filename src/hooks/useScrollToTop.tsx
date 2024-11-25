import { useEffect } from 'react';
import { scrollToTop } from 'utils/scrollToTop';

export const useScrollToTop = () => {
  useEffect(() => {
    scrollToTop();
  }, []);
};
