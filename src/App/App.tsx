import { Routes, Route } from 'react-router-dom';
import { ROUTES } from 'config/consts';
import LocalStorageSync from 'store/RootStore/components/LocalStorageSync';
import SearchQuerySync from 'store/RootStore/components/SearchQuerySync';
import MainLayout from './layouts/MainLayout';
import NewOrderLayout from './layouts/NewOrderLayout';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import NewOrderPage from './pages/NewOrderPage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <>
      <SearchQuerySync />
      <LocalStorageSync />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.product}>
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path={ROUTES.search} element={<SearchPage />} />
          <Route element={<NewOrderLayout />}>
            <Route path={ROUTES.cart} element={<CartPage />} />
            <Route path={ROUTES.newOrder} element={<NewOrderPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
