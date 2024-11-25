import { TCountedProduct } from './product';

export type TNewOrderField = { value: string; error: string };

export type TNewOrderFields = { name: TNewOrderField; email: TNewOrderField };

export type TNewOrderFieldsKey = keyof TNewOrderFields;

export type TNewOrder = {
  orderProducts: TCountedProduct[];
  fields: TNewOrderFields;
};
