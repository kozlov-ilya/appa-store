import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { customAlphabet } from 'nanoid';
import { addOrderApi, getOrdersByIdsApi } from 'api/order';
import { getProductsByIds } from 'api/product';
import {
  Meta,
  normalizeProduct,
  OrderErrorMessages,
  OrderSuccessMessages,
  TCountedProduct,
  TLocalStorageOrder,
  TOrder,
  TOrderProducts,
  TOrderResponse,
} from 'store/types';
import RootStore from '../RootStore';

type PrivateFields = '_newOrderProducts' | '_newOrderMeta' | '_userOrders' | '_userOrdersMeta';

export default class OrderStore {
  private _rootStore: RootStore;

  private _newOrderProducts: TOrderProducts = [];
  private _newOrderMeta: Meta = Meta.initial;

  private _userOrders: TOrder[] = [];
  private _userOrdersMeta: Meta = Meta.initial;

  constructor(rootStore: RootStore) {
    makeObservable<OrderStore, PrivateFields>(this, {
      _newOrderProducts: observable,
      _newOrderMeta: observable,
      _userOrders: observable,
      _userOrdersMeta: observable,

      newOrderProducts: computed,
      newOrderMeta: computed,
      userOrders: computed,
      userOrdersMeta: computed,

      resetNewOrder: action.bound,
      setNewOrderProducts: action.bound,
      loadNewOrderProductsFromLocal: action.bound,
      loadNewOrderProductsFromCart: action.bound,
      loadUserOrders: action.bound,
      addUserOrder: action.bound,
    });

    this._rootStore = rootStore;
  }

  get newOrderProducts() {
    return this._newOrderProducts;
  }

  get newOrderMeta() {
    return this._newOrderMeta;
  }

  get userOrders() {
    return this._userOrders;
  }

  get userOrdersMeta() {
    return this._userOrdersMeta;
  }

  resetNewOrder() {
    this._newOrderProducts = [];
    this._newOrderMeta = Meta.initial;
  }

  setNewOrderProducts(products: TCountedProduct[]) {
    this._newOrderProducts = products;
  }

  async loadNewOrderProductsFromLocal(localOrderProducts: TLocalStorageOrder) {
    if (!localOrderProducts.length) {
      return;
    }

    this._newOrderMeta = Meta.loading;

    try {
      const products = await getProductsByIds(localOrderProducts.map((item) => item.id));

      runInAction(() => {
        this._newOrderProducts = localOrderProducts.map(({ id, count }) => ({
          product: normalizeProduct(products.find((p) => p.id === id)!),
          count,
        }));
        this._newOrderMeta = Meta.success;
      });
    } catch {
      runInAction(() => {
        this._newOrderProducts = [];
        this._newOrderMeta = Meta.error;
      });
    }
  }

  loadNewOrderProductsFromCart() {
    this._newOrderProducts = this._rootStore.cartStore.cart;
  }

  async loadUserOrders() {
    const user = this._rootStore.authStore.user;

    if (!user) {
      return;
    }

    this._userOrders = [];
    this._userOrdersMeta = Meta.loading;

    try {
      const orders = await getOrdersByIdsApi(user.orders);

      runInAction(() => {
        this._userOrders = orders;
        this._userOrdersMeta = Meta.success;
      });
    } catch {
      runInAction(() => {
        this._userOrders = [];
        this._userOrdersMeta = Meta.error;
      });
    }
  }

  async addUserOrder(order: Omit<TOrder, 'id' | 'products' | 'date'>): Promise<TOrderResponse> {
    const nanoid = customAlphabet('1234567890', 10);
    const id = nanoid();

    const newOrder: TOrder = { id, ...order, products: this.newOrderProducts, date: new Date() };

    try {
      await addOrderApi(newOrder);

      runInAction(() => {
        this._userOrders = [...this._userOrders, newOrder];
        this._rootStore.authStore.updateUserOrders(this._userOrders);

        this.resetNewOrder();
        this._rootStore.cartStore.resetCart();
      });

      return { order: newOrder, message: OrderSuccessMessages.add };
    } catch {
      return { order: null, message: OrderErrorMessages.add };
    }
  }
}
