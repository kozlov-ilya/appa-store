import { useQuery } from '@tanstack/react-query';
import { getProduct } from 'api/product';

export const useGetProduct = (id: string) => {
  const {
    data: product,
    error,
    isPending,
  } = useQuery({ queryKey: ['products', id], queryFn: () => getProduct(id), staleTime: 10 * (60 * 1000) });

  return { product, error, isPending };
};
