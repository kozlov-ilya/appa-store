import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from 'config/consts';
import { auth, db } from 'config/firebase';
import { TUser } from 'store/types';
import { TLoginData, TRegisterData } from './types';

export const loginWithEmailApi = async (data: TLoginData): Promise<UserCredential> => {
  const { email, password } = data;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmailApi = async (data: TRegisterData): Promise<UserCredential> => {
  const { email, password } = data;

  const credentials = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(credentials.user, { displayName: data.name });

  return credentials;
};

export const loginWithGoogleApi = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();

  return await signInWithPopup(auth, provider);
};

export const createUserApi = async (user: TUser): Promise<boolean> => {
  const docRef = doc(db, FIRESTORE_COLLECTIONS.users, user.uid);

  const userSnap = await getDoc(docRef);

  if (userSnap.exists()) {
    return false;
  }

  await setDoc(docRef, user);

  return true;
};

export const getUserByIdApi = async (uid: string): Promise<TUser> => {
  const docRef = doc(db, FIRESTORE_COLLECTIONS.users, uid);

  const userSnap = await getDoc(docRef);

  return userSnap.data() as TUser;
};

export const updateUserByIdApi = async (uid: string, data: Omit<TUser, 'uid' | 'email' | 'orders'>): Promise<void> => {
  const docRef = doc(db, FIRESTORE_COLLECTIONS.users, uid);

  await updateDoc(docRef, data);
};

export const updateUserOrdersByIdApi = async (uid: string, data: Pick<TUser, 'orders'>): Promise<void> => {
  const docRef = doc(db, FIRESTORE_COLLECTIONS.users, uid);

  await updateDoc(docRef, data);
};

export const logoutApi = async () => {
  await signOut(auth);
};
