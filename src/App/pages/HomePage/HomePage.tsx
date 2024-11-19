import ProductCardList from 'components/ProductCardList';
import CategoryTabs from './components/CategoryTabs';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div>
      <div className={styles['CategoryTabsContainer']}>
        <CategoryTabs />
      </div>
      <div className={styles['ProductListContainer']}>
        <ProductCardList />
      </div>
    </div>
  );
};

export default HomePage;
