import { useCallback } from 'react';
import rootStore from 'store/RootStore';

export const useOrder = () => {
  const { setOrderFieldValue } = rootStore.orderStore;

  const handleNameChange = useCallback(
    (value: string) => {
      setOrderFieldValue('name', value);
    },
    [setOrderFieldValue],
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      setOrderFieldValue('email', value);
    },
    [setOrderFieldValue],
  );

  return { store: rootStore.orderStore, handleNameChange, handleEmailChange };
};
