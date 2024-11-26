import { collection, doc, getDocs, query, setDoc, where, Timestamp } from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from 'config/consts';
import { db } from 'config/firebase';
import { TOrder, TOrderId } from 'store/types';

export const getOrdersByIdsApi = async (ordersIds: TOrderId[]): Promise<TOrder[]> => {
  const collectionRef = collection(db, FIRESTORE_COLLECTIONS.orders);

  const q = query(collectionRef, where('id', 'in', ordersIds));

  const querySnapshot = await getDocs(q);

  const orders = querySnapshot.docs.map((doc) => doc.data());

  return orders.map((order) => ({ ...order, date: order.date.toDate() }) as TOrder);
};

export const addOrderApi = async (order: TOrder): Promise<void> => {
  const collectionRef = collection(db, FIRESTORE_COLLECTIONS.orders);

  const timestamp = Timestamp.fromDate(order.date);

  await setDoc(doc(collectionRef, order.id), { ...order, date: timestamp });
};
