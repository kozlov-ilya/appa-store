import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import {
  createUserApi,
  getUserByIdApi,
  loginWithEmailApi,
  loginWithGoogleApi,
  logoutApi,
  registerWithEmailApi,
  updateUserByIdApi,
  updateUserOrdersByIdApi,
} from 'api/auth';
import { TLoginData, TRegisterData } from 'api/types';
import { AuthErrorMessages, AuthSuccessMessages, Meta, TAuthResponse, TOrder, TUser } from 'store/types';
import RootStore from '../RootStore';

type PrivateFields = '_authUser' | '_authMeta' | '_user' | '_userMeta';

export default class AuthStore {
  private _rootStore: RootStore;

  private _authUser: User | null = null;
  private _authMeta: Meta = Meta.loading;

  private _user: TUser | null = null;
  private _userMeta: Meta = Meta.initial;

  constructor(rootStore: RootStore) {
    makeObservable<AuthStore, PrivateFields>(this, {
      _authUser: observable.ref,
      _authMeta: observable,
      _user: observable.ref,
      _userMeta: observable,
      authUser: computed,
      authMeta: computed,
      user: computed,
      loginWithEmail: action.bound,
      registerWithEmail: action.bound,
      loginWithGoogle: action.bound,
      logout: action.bound,
      setAuthUser: action.bound,
      loadUser: action.bound,
      updateUser: action.bound,
      updateUserOrders: action.bound,
    });

    this._rootStore = rootStore;

    reaction(
      () => this._authUser,
      (authUser) => {
        if (!authUser) {
          return;
        }

        this.loadUser(authUser.uid);
      },
    );
  }

  get authUser() {
    return this._authUser;
  }

  get authMeta() {
    return this._authMeta;
  }

  get user() {
    return this._user;
  }

  get userMeta() {
    return this._userMeta;
  }

  async setAuthUser(user: User | null) {
    this._authUser = user;
    this._authMeta = Meta.success;
  }

  async loadUser(uid: string) {
    try {
      this._user = null;
      this._userMeta = Meta.loading;

      const user = await getUserByIdApi(uid);

      runInAction(() => {
        this._user = user;
        this._userMeta = Meta.success;

        this._rootStore.orderStore.loadUserOrders();
      });
    } catch {
      runInAction(() => {
        this._user = null;
        this._userMeta = Meta.error;
      });
    }
  }

  async updateUser(data: Omit<TUser, 'uid' | 'email' | 'orders'>) {
    if (!this._user) {
      return { success: false, message: AuthErrorMessages.updateUser };
    }

    try {
      await updateUserByIdApi(this._user.uid, data);

      runInAction(() => {
        if (!this._user) {
          return { success: false, message: AuthErrorMessages.updateUser };
        }

        this._user = { ...this._user, ...data };
      });

      return { success: true, message: AuthSuccessMessages.updateUser };
    } catch {
      return { success: false, message: AuthErrorMessages.updateUser };
    }
  }

  async updateUserOrders(orders: TOrder[]) {
    if (!this._user) {
      return;
    }

    const ordersIds = orders.map((order) => order.id);

    try {
      await updateUserOrdersByIdApi(this._user.uid, { orders: ordersIds });

      runInAction(() => {
        if (!this._user) {
          return;
        }

        this._user.orders = ordersIds;
      });
    } catch {
      this._user.orders = [];
    }
  }

  async loginWithEmail(data: TLoginData): Promise<TAuthResponse> {
    try {
      await loginWithEmailApi(data);

      return { success: true };
    } catch (err) {
      return this._handleAuthError(err);
    }
  }

  async registerWithEmail(data: TRegisterData): Promise<TAuthResponse> {
    try {
      const credentials = await registerWithEmailApi(data);

      const isNewUserCreated = await this._createUser(credentials.user);

      if (!isNewUserCreated) {
        return { success: true };
      }

      await this.loadUser(credentials.user.uid);

      return { success: true };
    } catch (err) {
      return this._handleAuthError(err);
    }
  }

  async loginWithGoogle(): Promise<TAuthResponse> {
    try {
      const credentials = await loginWithGoogleApi();

      const isNewUserCreated = await this._createUser(credentials.user);

      if (!isNewUserCreated) {
        return { success: true };
      }

      await this.loadUser(credentials.user.uid);

      return { success: true };
    } catch (err) {
      return this._handleAuthError(err);
    }
  }

  async logout(): Promise<TAuthResponse> {
    try {
      await logoutApi();

      return { success: true };
    } catch (err) {
      return this._handleAuthError(err);
    }
  }

  private _handleAuthError(err: unknown) {
    if (err instanceof FirebaseError) {
      if (err.code.startsWith('auth')) {
        return { success: false, message: AuthErrorMessages[err.code] };
      }

      return { success: false, message: AuthErrorMessages.internal };
    }
    return { success: false, message: AuthErrorMessages.unknown };
  }

  private async _createUser(user: User) {
    const { uid, email, displayName } = user;

    return await createUserApi({ uid, email, name: displayName, surname: null, phone: null, orders: [] });
  }
}
