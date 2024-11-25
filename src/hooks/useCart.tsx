import rootStore from 'store/RootStore';
import { Meta } from 'store/types';

export const useCart = () => {
  const { meta } = rootStore.cartStore;

  const isLoading = meta === Meta.loading;

  return { store: rootStore.cartStore, isLoading };
};
