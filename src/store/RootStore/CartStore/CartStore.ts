import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { getProductsByIds } from 'api/product';
import { cartLimit, cartLimitErrorMessage } from 'config/consts';
import { Meta, TCountedProduct, TLocalStorageCart, TProduct, TProductId } from 'store/types';

type PrivateFields = '_cart' | '_meta';

export default class CartStore {
  private _cart: TCountedProduct[] = [];
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cart: observable.ref,
      _meta: observable,
      cart: computed,
      meta: computed,
      sumCost: computed,
      cartProducts: computed,
      loadCartFromLocal: action.bound,
      addProductToCart: action.bound,
      removeProductFromCart: action.bound,
      resetCart: action.bound,
    });
  }

  get cart() {
    return this._cart;
  }

  get meta() {
    return this._meta;
  }

  get sumCost() {
    return this._cart.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  get cartProducts(): TProduct[] {
    return this._cart.map((item) => item.product);
  }

  async loadCartFromLocal(localCart: TLocalStorageCart) {
    if (!localCart.length) {
      return;
    }

    this._meta = Meta.loading;

    try {
      const products = await getProductsByIds(localCart.map((item) => item.id));

      runInAction(() => {
        this._cart = localCart.map(({ id, count }) => ({
          product: products.find((p) => p.id === id) as TProduct,
          count,
        }));
        this._meta = Meta.success;
      });
    } catch {
      this._cart = [];
      this._meta = Meta.error;
    }
  }

  addProductToCart(product: TProduct) {
    if (this.cart.length >= cartLimit) {
      toast.error(cartLimitErrorMessage);

      return;
    }

    this._cart = [...this._cart, { product, count: 1 }];
  }

  removeProductFromCart(productId: TProductId) {
    this._cart = this._cart.filter((item) => item.product.id !== productId);
  }

  resetCart() {
    this._cart = [];
    this._meta = Meta.initial;
  }
}
