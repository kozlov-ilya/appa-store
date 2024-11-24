import { useEffect } from 'react';
import rootStore from 'store/RootStore';

const LocalStorageSync = () => {
  const { localStorage, loadLocalStorage } = rootStore.localStorageStore;
  const { loadCartFromLocal } = rootStore.cartStore;
  const { loadNewOrderProductsFromLocal } = rootStore.orderStore;

  useEffect(() => {
    loadLocalStorage();

    loadCartFromLocal(localStorage.cart);
    loadNewOrderProductsFromLocal(localStorage.order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LocalStorageSync;
