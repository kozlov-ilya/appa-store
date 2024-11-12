import rootStore from 'store/RootStore';
import { Meta } from 'store/types';

export const useProducts = () => {
  const { products, productsCount, loadProducts, meta } = rootStore.productsStore;

  const isLoading = meta === Meta.loading;
  const error = meta === Meta.error;

  return { products, productsCount, loadProducts, isLoading, error };
};
