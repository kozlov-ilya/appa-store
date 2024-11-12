import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getProduct } from 'api/product';
import { ILocalStore } from 'utils/useLocalStore';
import { Meta, normalizeProduct, TProduct } from '../types';

type PrivateFields = '_product' | '_meta';

export default class ProductStore implements ILocalStore {
  private _product: TProduct | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _product: observable,
      _meta: observable,
      product: computed,
      meta: computed,
      loadProduct: action,
      destroy: action,
    });
  }

  get product(): TProduct | null {
    return this._product;
  }

  get meta(): Meta {
    return this._meta;
  }

  async loadProduct(productId?: string) {
    this._meta = Meta.loading;
    this._product = null;

    if (!productId) {
      this._meta = Meta.error;

      return;
    }

    try {
      const product = await getProduct(productId);

      runInAction(() => {
        if (product === null) {
          this._meta = Meta.error;
          this._product = null;

          return;
        }

        this._meta = Meta.success;
        this._product = normalizeProduct(product);
      });
    } catch {
      this._meta = Meta.error;
      this._product = null;
    }
  }

  destroy(): void {
    this._product = null;
    this._meta = Meta.initial;
  }
}
