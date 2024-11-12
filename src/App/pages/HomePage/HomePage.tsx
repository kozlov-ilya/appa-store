import { useSearchParams } from 'react-router-dom';
import Skeleton from 'components/Skeleton';
import { useGetCategoryProducts } from 'hooks';
import CategoryTabs from './components/CategoryTabs';
import ProductList from './components/ProductList';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category') || 'jackets';

  const { products, isPending } = useGetCategoryProducts(category);

  return (
    <div className={'HomePage'}>
      <div className={styles['CategoryTabsContainer']}>
        <CategoryTabs />
      </div>
      {isPending && <Skeleton />}
      <div className={styles['ProductListContainer']}>{products && <ProductList products={products} />}</div>
    </div>
  );
};

export default HomePage;
