import { TProductId } from './product';

export type TLocalStorageCartItem = { id: TProductId; count: number };

export type TLocalStorageCart = TLocalStorageCartItem[];

export type TLocalStorage = {
  cart: TLocalStorageCart;
};

export type TLocalStorageKey = keyof TLocalStorage;
