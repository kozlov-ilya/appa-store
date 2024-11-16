import { Routes, Route } from 'react-router-dom';
import { ROUTES } from 'config/consts';
import SearchQuerySync from 'store/RootStore/components/SearchQuerySync';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <>
      <SearchQuerySync />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.product}>
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path={ROUTES.search} element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
