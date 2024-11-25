import { action, computed, makeObservable, observable, reaction } from 'mobx';
import { TLocalStorage, TLocalStorageCart } from 'store/types';
import RootStore from '../RootStore';

type PrivateFields = '_localStorage';

export default class LocalStorageStore {
  private _rootStore: RootStore;

  private _localStorage: TLocalStorage = {
    cart: [],
  };

  constructor(rootStore: RootStore) {
    makeObservable<LocalStorageStore, PrivateFields>(this, {
      _localStorage: observable,
      localStorage: computed,
      setLocalCart: action.bound,
      loadLocalStorage: action.bound,
    });

    this._rootStore = rootStore;

    reaction(
      () => this._rootStore.cartStore.cart,
      (cart) => {
        this.setLocalCart(cart.map((item) => ({ id: item.product.id, count: item.count })));
      },
    );
  }

  get localStorage() {
    return this._localStorage;
  }

  setLocalCart(cart: TLocalStorageCart) {
    this._localStorage.cart = cart;

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  loadLocalStorage() {
    try {
      const localCart = localStorage.getItem('cart');

      this._localStorage.cart = localCart !== null ? JSON.parse(localCart) : [];
    } catch {
      this._localStorage.cart = [];
    }
  }
}
