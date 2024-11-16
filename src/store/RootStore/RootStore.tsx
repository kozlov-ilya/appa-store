import ProductsStore from './ProductsStore';
import SearchQueryStore from './SearchQueryStore';

export default class RootStore {
  readonly searchQueryStore: SearchQueryStore;
  readonly productsStore: ProductsStore;

  constructor() {
    this.searchQueryStore = new SearchQueryStore();
    this.productsStore = new ProductsStore(this);
  }
}
