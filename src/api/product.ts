import { doc, getDoc, collection, getDocs, setDoc, where, query } from 'firebase/firestore';
import { db } from 'configs/firebase';
import { TProduct } from 'types';

export const getProduct = async (id: string): Promise<TProduct | null> => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as TProduct;
};

export const addProduct = async (product: TProduct): Promise<void> => {
  await setDoc(doc(db, 'products', product.id), product);
};

export const getAllProducts = async (): Promise<TProduct[] | null> => {
  const collectionRef = collection(db, 'products');
  const collectionSnap = await getDocs(collectionRef);

  return collectionSnap.docs.map((doc) => doc.data() as TProduct);
};

export const getCategoryProducts = async (category: string): Promise<TProduct[] | null> => {
  const q = query(collection(db, 'products'), where('category', '==', category));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data() as TProduct);
};
