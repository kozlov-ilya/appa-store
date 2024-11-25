import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  where,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
} from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from 'config/consts';
import { db } from 'config/firebase';
import { TProduct, TProductApi, TProductId, TProductsQueryParams } from 'store/types';
import { createSearchIndex, getSoundexTerms } from 'utils/fuzzySearch';
import { TProductsParams, TProductsReturnValue } from './types';

export const addProduct = async (product: TProduct): Promise<void> => {
  const searchIndex = createSearchIndex(product.name);

  const searchableProduct: TProductApi = { ...product, searchIndex };

  await setDoc(doc(db, FIRESTORE_COLLECTIONS.products, searchableProduct.id), searchableProduct);
};

export const getProduct = async (id: string): Promise<TProductApi | null> => {
  const docRef = doc(db, FIRESTORE_COLLECTIONS.products, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data() as TProductApi;
};

export const getProductsCount = async (params: TProductsQueryParams) => {
  const { category, term } = params;

  let q = query(collection(db, FIRESTORE_COLLECTIONS.products), orderBy('name'));

  if (category === null && term == null) {
    return 0;
  }

  if (category) {
    q = query(q, where('category', '==', category));
  }

  if (term !== null) {
    const searchTerms = getSoundexTerms(term);

    q = query(q, where('searchIndex', 'array-contains', searchTerms));
  }

  const count = await getCountFromServer(q);

  return count.data().count;
};

export const getProducts = async (params: TProductsParams): Promise<TProductsReturnValue> => {
  const {
    queryParams: { term, category },
    startAfterDoc,
    limitPerPage = 12,
    orderByField = 'name',
  } = params;

  let q = query(collection(db, FIRESTORE_COLLECTIONS.products), orderBy(orderByField), limit(limitPerPage));

  if (category === null && term == null) {
    return { products: null, lastDoc: null };
  }

  if (category !== null) {
    q = query(q, where('category', '==', category));
  }

  if (term !== null) {
    const searchTerms = getSoundexTerms(term);

    q = query(q, where('searchIndex', 'array-contains', searchTerms));
  }

  if (startAfterDoc !== null) {
    q = query(q, startAfter(startAfterDoc));
  }

  const querySnapshot = await getDocs(q);

  return {
    products: querySnapshot.docs.map((doc) => doc.data() as TProductApi),
    lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const getProductsByIds = async (productsIds: TProductId[]): Promise<TProductApi[]> => {
  const collectionRef = collection(db, FIRESTORE_COLLECTIONS.products);

  const q = query(collectionRef, where('id', 'in', productsIds));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data() as TProductApi);
};
