import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Providers from 'providers';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product">
              <Route path=":id" element={<ProductPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
};

export default App;
