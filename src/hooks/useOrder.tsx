import rootStore from 'store/RootStore';
import { Meta } from 'store/types';

export const useOrder = () => {
  const { newOrderMeta, userOrdersMeta } = rootStore.orderStore;

  const isNewOrderProductsLoading = newOrderMeta === Meta.loading;
  const isUserOrdersLoading = userOrdersMeta === Meta.loading;

  return {
    store: rootStore.orderStore,
    isNewOrderProductsLoading,
    isUserOrdersLoading,
  };
};
