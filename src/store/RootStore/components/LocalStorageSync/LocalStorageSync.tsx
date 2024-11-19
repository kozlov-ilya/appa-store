import { useEffect } from 'react';
import rootStore from 'store/RootStore';

const LocalStorageSync = () => {
  const { localStorage, loadLocalStorage } = rootStore.localStorageStore;
  const { loadCart } = rootStore.cartStore;

  useEffect(() => {
    loadLocalStorage();

    loadCart(localStorage.cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LocalStorageSync;
