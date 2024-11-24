import ProductCardList from 'components/ProductCardList';
import Text from 'components/Text';
import Search from './components/Search';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  return (
    <>
      <div className={styles['Header']}>
        <Text className={styles['Title']} view="title" tag="h1" weight="medium">
          Поиск товаров
        </Text>
        <Text className={styles['Subtitle']} view="p-18" color="secondary">
          Найди всё, что тебе нужно. Удобный поиск — твой лучший гид по стилю.
        </Text>
      </div>
      <div className={styles['SearchContainer']}>
        <Search />
      </div>
      <div className={styles['ProductListContainer']}>
        <ProductCardList />
      </div>
    </>
  );
};

export default SearchPage;
