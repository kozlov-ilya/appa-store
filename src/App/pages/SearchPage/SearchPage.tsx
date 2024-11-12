import ProductList from 'components/ProductList';
import Search from './components/Search';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  return (
    <div>
      <div className={styles['SearchContainer']}>
        <Search />
      </div>
      <div className={styles['ProductListContainer']}>
        <ProductList />
      </div>
    </div>
  );
};

export default SearchPage;
