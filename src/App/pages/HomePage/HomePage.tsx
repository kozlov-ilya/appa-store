import ProductList from 'components/ProductList';
import CategoryTabs from './components/CategoryTabs';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div>
      <div className={styles['CategoryTabsContainer']}>
        <CategoryTabs />
      </div>
      <div className={styles['ProductListContainer']}>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
