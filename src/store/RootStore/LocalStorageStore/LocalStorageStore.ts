import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { LOCAL_STORAGE_ITEMS } from 'config/consts';
import { TLocalStorage, TLocalStorageCart, TLocalStorageOrder } from 'store/types';
import RootStore from '../RootStore';

type PrivateFields = '_localStorage';

export default class LocalStorageStore {
  private _rootStore: RootStore;

  private _localStorage: TLocalStorage = {
    cart: [],
    order: [],
  };

  constructor(rootStore: RootStore) {
    makeObservable<LocalStorageStore, PrivateFields>(this, {
      _localStorage: observable,
      localStorage: computed,
      setLocalCart: action.bound,
      setLocalOrder: action.bound,
      loadLocalStorage: action.bound,
    });

    this._rootStore = rootStore;

    reaction(
      () => this._rootStore.cartStore.cart,
      (cart) => {
        this.setLocalCart(cart.map((item) => ({ id: item.product.id, count: item.count })));
      },
    );

    reaction(
      () => this._rootStore.orderStore.newOrderProducts,
      (newOrderProducts) => {
        this.setLocalOrder(newOrderProducts.map((item) => ({ id: item.product.id, count: item.count })));
      },
    );
  }

  get localStorage() {
    return this._localStorage;
  }

  setLocalCart(cart: TLocalStorageCart) {
    this._localStorage.cart = cart;

    localStorage.setItem(LOCAL_STORAGE_ITEMS.cart, JSON.stringify(cart));
  }

  setLocalOrder(order: TLocalStorageOrder) {
    this._localStorage.order = order;

    localStorage.setItem(LOCAL_STORAGE_ITEMS.order, JSON.stringify(order));
  }

  loadLocalStorage() {
    try {
      const localCart = localStorage.getItem(LOCAL_STORAGE_ITEMS.cart);
      const localOrder = localStorage.getItem(LOCAL_STORAGE_ITEMS.order);

      this._localStorage.cart = localCart !== null ? JSON.parse(localCart) : [];
      this._localStorage.order = localOrder !== null ? JSON.parse(localOrder) : [];
    } catch {
      this._localStorage.cart = [];
      this._localStorage.order = [];
    }
  }
}
