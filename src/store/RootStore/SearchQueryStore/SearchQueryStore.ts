import { action, makeObservable, observable } from 'mobx';
import { parse, stringify } from 'qs';
import { DEFAULT_CATEGORY, ROUTES } from 'config/consts';
import { isCategory, TCategory, TSearchParams, TSearchParamsKey } from 'store/types';

type PrivateFields = '_params';

export default class SearchQueryStore {
  private _params: TSearchParams = {
    category: null,
    term: null,
  };
  private _search: string = '';

  constructor() {
    makeObservable<SearchQueryStore, PrivateFields>(this, {
      _params: observable.ref,
      setParams: action,
    });
  }

  getParam(key: TSearchParamsKey) {
    return this._params[key];
  }

  setParams(pathname: string, search: string): string {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (pathname !== ROUTES.home && pathname !== ROUTES.search) {
      return search;
    }

    if (this._search === search && search !== '') {
      return search;
    }

    const newParams = { ...this._params };
    const parsedParams = parse(search);

    /* -------------------------------- category -------------------------------- */
    const category = parsedParams?.category;
    if (isCategory(category)) {
      newParams.category = category as TCategory;
    } else {
      newParams.category = pathname === ROUTES.home ? DEFAULT_CATEGORY.category : null;
    }

    /* ---------------------------------- term ---------------------------------- */
    const term = parsedParams?.term;
    newParams.term = typeof term === 'string' ? term : null;

    this._params = { ...this._params, ...newParams };

    const parsedSearch = stringify(this._params, { skipNulls: true });
    this._search = parsedSearch;

    return parsedSearch;
  }
}
