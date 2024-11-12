import { nanoid } from 'nanoid';
import { addProduct } from 'api/product';
import { TCategory } from 'store/types';
import sampleProducts from '../data/sampleProducts.json';

const seedCategory = async (category: TCategory, times: number) => {
  const filteredProducts = sampleProducts.filter((p) => p.category === category);

  for (let i = 0; i < times; i++) {
    filteredProducts.forEach(async (product) => {
      const productId = nanoid();

      await addProduct({
        ...product,
        category: product.category as TCategory,
        name: `${product.name} (${i})`,
        id: productId,
      });
    });
  }
};

export const seedProducts = async () => {
  await seedCategory('jackets', 6);
  await seedCategory('tshirts', 6);
  await seedCategory('accesories', 24);
};
