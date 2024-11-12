import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from 'api/product';

export const useGetProducts = () => {
  const {
    data: products,
    error,
    isPending,
  } = useQuery({ queryKey: ['products', 'all'], queryFn: getAllProducts, staleTime: 100 * (60 * 1000) });

  return { products, error, isPending };
};
