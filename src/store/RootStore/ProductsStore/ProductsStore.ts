import { DocumentSnapshot } from 'firebase/firestore';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { getProducts, getProductsCount } from 'api/product';
import { TProduct, Meta, TProductsQueryParams, TProductsQueryParamsKeys, normalizeProduct } from 'store/types';
import RootStore from '../RootStore';

type PrivateFields = '_products' | '_meta' | '_productsCount';

export default class ProductsStore {
  private _rootStore: RootStore;

  private _products: TProduct[] = [];
  private _productsCount: number | null = null;
  private _meta: Meta = Meta.initial;

  private _lastDoc: DocumentSnapshot | null = null;

  constructor(rootStore: RootStore) {
    makeObservable<ProductsStore, PrivateFields>(this, {
      _products: observable.ref,
      _productsCount: observable,
      _meta: observable,

      products: computed,
      meta: computed,
      productsCount: computed,

      loadProducts: action.bound,
      loadProductsCount: action,
      resetProducts: action,
    });

    this._rootStore = rootStore;

    reaction(
      () => this._getQueryParam('category'),
      () => this._handleParamsChange(),
    );

    reaction(
      () => this._getQueryParam('term'),
      () => this._handleParamsChange(),
    );
  }

  get products() {
    return this._products;
  }

  get productsCount() {
    return this._productsCount;
  }

  get meta() {
    return this._meta;
  }

  private _handleParamsChange() {
    if (this._meta === Meta.loading) {
      return;
    }

    this.resetProducts();

    this.loadProductsCount();
    this.loadProducts();
  }

  private _getQueryParam(param: TProductsQueryParamsKeys) {
    return this._rootStore.searchQueryStore.getParam(param);
  }

  private _getProductsQueryParams(): TProductsQueryParams {
    return {
      category: this._getQueryParam('category'),
      term: this._getQueryParam('term'),
    };
  }

  resetProducts() {
    this._products = [];
    this._lastDoc = null;
    this._productsCount = null;
  }

  async loadProducts() {
    this._meta = Meta.loading;

    try {
      const queryParams = this._getProductsQueryParams();

      const { products, lastDoc } = await getProducts({ queryParams, startAfterDoc: this._lastDoc });

      runInAction(() => {
        if (!products) {
          this._products = [];
          this._lastDoc = null;
          this._meta = Meta.error;

          return;
        }

        this._products = [...this._products, ...products.map(normalizeProduct)];
        this._lastDoc = lastDoc;
        this._meta = Meta.success;
      });
    } catch {
      runInAction(() => {
        this._products = [];
        this._lastDoc = null;
        this._meta = Meta.error;
      });
    }
  }

  async loadProductsCount() {
    try {
      const queryParams = this._getProductsQueryParams();

      const productsCount = await getProductsCount(queryParams);

      runInAction(() => {
        this._productsCount = productsCount;
      });
    } catch {
      runInAction(() => {
        this._productsCount = null;
      });
    }
  }
}
