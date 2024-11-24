import { TProductId } from './product';

export type TLocalStorageProduct = { id: TProductId; count: number };

export type TLocalStorageCart = TLocalStorageProduct[];

export type TLocalStorageOrder = TLocalStorageProduct[];

export type TLocalStorage = {
  cart: TLocalStorageCart;
  order: TLocalStorageOrder;
};

export type TLocalStorageKey = keyof TLocalStorage;
