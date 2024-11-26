import AuthStore from './AuthStore';
import CartStore from './CartStore';
import LocalStorageStore from './LocalStorageStore';
import OrderStore from './OrderStore';
import ProductsStore from './ProductsStore';
import SearchQueryStore from './SearchQueryStore';

export default class RootStore {
  readonly authStore: AuthStore;
  readonly searchQueryStore: SearchQueryStore;
  readonly cartStore: CartStore;
  readonly orderStore: OrderStore;
  readonly localStorageStore: LocalStorageStore;
  readonly productsStore: ProductsStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.searchQueryStore = new SearchQueryStore();
    this.cartStore = new CartStore();
    this.orderStore = new OrderStore(this);
    this.localStorageStore = new LocalStorageStore(this);
    this.productsStore = new ProductsStore(this);
  }
}
