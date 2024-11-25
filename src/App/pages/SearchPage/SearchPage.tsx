import ProductCardList from 'components/ProductCardList';
import Search from './components/Search';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  return (
    <div>
      <div className={styles['SearchContainer']}>
        <Search />
      </div>
      <div className={styles['ProductListContainer']}>
        <ProductCardList />
      </div>
    </div>
  );
};

export default SearchPage;
