import { setDoc, doc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../configs/firebase';
import sampleProducts from '../data/sampleProducts.json';
import { TProduct } from '../types';

const addProduct = async (product: TProduct): Promise<void> => {
  await setDoc(doc(db, 'products', product.id), product);
};

const seedProducts = async () => {
  sampleProducts.forEach(async (product) => {
    const productId = nanoid();

    await addProduct({ ...product, id: productId });
  });
};

// eslint-disable-next-line no-console
seedProducts().then(() => console.log('Database was seeded!'));
