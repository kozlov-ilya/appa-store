import rootStore from 'store/RootStore';
import { Meta } from 'store/types';

export const useAuth = () => {
  const { authMeta, userMeta } = rootStore.authStore;

  const isAuthLoading = authMeta === Meta.loading;
  const isUserLoading = userMeta === Meta.loading;

  return { store: rootStore.authStore, isAuthLoading, isUserLoading };
};
