import { action, computed, makeObservable, observable } from 'mobx';
import { TNewOrder, TNewOrderFieldsKey } from 'store/types';
import RootStore from '../RootStore';

type PrivateFields = '_order';

export default class OrderStore {
  private _rootStore: RootStore;

  private _order: TNewOrder = {
    orderProducts: [],
    fields: {
      name: {
        value: '',
        error: '',
      },
      email: {
        value: '',
        error: '',
      },
    },
  };

  constructor(rootStore: RootStore) {
    makeObservable<OrderStore, PrivateFields>(this, {
      _order: observable,
      orderProducts: computed,
      name: computed,
      email: computed,
      setOrderFieldValue: action.bound,
      setOrderFieldError: action.bound,
      resetOrderFieldsErrors: action.bound,
      loadOrderProductsFromCart: action.bound,
      submitOrder: action.bound,
    });

    this._rootStore = rootStore;
  }

  get orderProducts() {
    return this._order.orderProducts;
  }

  get name() {
    return this._order.fields.name;
  }

  get email() {
    return this._order.fields.email;
  }

  setOrderFieldValue(key: TNewOrderFieldsKey, value: string) {
    this._order.fields[key].value = value;
  }

  setOrderFieldError(key: TNewOrderFieldsKey, error: string) {
    this._order.fields[key].error = error;
  }

  resetOrderFieldsErrors() {
    this.setOrderFieldError('name', '');
    this.setOrderFieldError('email', '');
  }

  resetOrderProducts() {
    this._order.orderProducts = [];
  }

  loadOrderProductsFromCart() {
    this._order.orderProducts = this._rootStore.cartStore.cart;
  }

  submitOrder() {
    let dataValid = true;

    this.resetOrderFieldsErrors();

    if (!this.name.value) {
      this.setOrderFieldError('name', 'Имя является обязательным полем!');
      dataValid = false;
    }

    if (!this.email.value) {
      this.setOrderFieldError('email', 'Email является обязательным полем!');
      dataValid = false;
    }

    if (!dataValid) {
      return;
    }
  }
}
