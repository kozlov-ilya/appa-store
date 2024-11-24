import { DocumentSnapshot, OrderByDirection } from 'firebase/firestore';
import { TLoginForm, TProductApi, TProductsQueryParams, TRegisterForm } from 'store/types';

export type TProductsParams = {
  queryParams: TProductsQueryParams;
  startAfterDoc: DocumentSnapshot | null;
  limitPerPage?: number;
  orderByField?: 'name' | 'price';
  orderDir?: OrderByDirection;
};

export type TProductsReturnValue = {
  products: TProductApi[] | null;
  lastDoc: DocumentSnapshot | null;
};

export type TLoginData = TLoginForm;

export type TRegisterData = TRegisterForm;
