import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import rootStore from 'store/RootStore/instance';

const SearchQuerySync = () => {
  const { search, pathname } = useLocation();

  const { searchQueryStore } = rootStore;

  useEffect(() => {
    let parsedSearch = searchQueryStore.setParams(pathname, search);

    // Upadate URL with valid params
    parsedSearch = parsedSearch.startsWith('?') ? parsedSearch.slice(1) : parsedSearch;

    if (parsedSearch) {
      window.history.replaceState(null, '', `${pathname}?${parsedSearch}`);
    }
  }, [search, searchQueryStore, pathname]);

  return null;
};

export default SearchQuerySync;
