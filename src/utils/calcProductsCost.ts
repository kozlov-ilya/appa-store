import { TCountedProduct } from 'store/types';

export const calcProductsCost = (products?: TCountedProduct[]) => {
  return products?.reduce((sum, cp) => sum + cp.product.price * cp.count, 0) || 0;
};
