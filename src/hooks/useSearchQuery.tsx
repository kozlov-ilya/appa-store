import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TSearchParamsKey } from 'store/types';

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParam = useCallback(
    (param: TSearchParamsKey, value: string) => {
      searchParams.set(param, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return { setQueryParam };
};
