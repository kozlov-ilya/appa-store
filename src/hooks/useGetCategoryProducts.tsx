import { useQuery } from '@tanstack/react-query';
import { getCategoryProducts } from 'api/product';

export const useGetCategoryProducts = (category: string) => {
  const {
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getCategoryProducts(category),
    staleTime: 10 * (60 * 1000),
  });

  return { products, error, isPending };
};
