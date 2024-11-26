import { Routes, Route } from 'react-router-dom';
import Toast from 'components/Toast';
import { ROUTES, PrivateRouteWrapper, AuthRouteWrapper } from 'routes';
import AuthSync from 'store/RootStore/components/AuthSync';
import LocalStorageSync from 'store/RootStore/components/LocalStorageSync';
import SearchQuerySync from 'store/RootStore/components/SearchQuerySync';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import OrderLayout from './layouts/OrderLayout';
import ProfileLayout from './layouts/ProfileLayout';
import {
  HomePage,
  CartPage,
  LoginPage,
  NewOrderPage,
  ProductPage,
  SearchPage,
  RegisterPage,
  ProfilePage,
  OrdersPage,
  OrderPage,
  NotFoundPage,
} from './pages';

const App = () => {
  return (
    <>
      <SearchQuerySync />
      <LocalStorageSync />
      <AuthSync />
      <Toast />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.product}>
            <Route path={':id'} element={<ProductPage />} />
          </Route>
          <Route path={ROUTES.search} element={<SearchPage />} />
          <Route element={<OrderLayout />}>
            <Route path={ROUTES.cart} element={<CartPage />} />
            <Route element={<PrivateRouteWrapper />}>
              <Route path={ROUTES.newOrder} element={<NewOrderPage />} />
              <Route path={ROUTES.order}>
                <Route path=":id" element={<OrderPage />} />
              </Route>
            </Route>
          </Route>
          <Route element={<PrivateRouteWrapper />}>
            <Route element={<ProfileLayout />}>
              <Route path={ROUTES.profile} element={<ProfilePage />} />
              <Route path={ROUTES.orders} element={<OrdersPage />} />
            </Route>
          </Route>
        </Route>
        <Route element={<AuthRouteWrapper />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.login} element={<LoginPage />} />
            <Route path={ROUTES.register} element={<RegisterPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
