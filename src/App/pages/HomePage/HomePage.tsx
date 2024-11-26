import ProductCardList from 'components/ProductCardList';
import Text from 'components/Text';
import CategoryTabs from './components/CategoryTabs';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <>
      <div className={styles['Header']}>
        <Text className={styles['Title']} view="title" tag="h1" weight="medium">
          Коллекции
        </Text>
        <Text className={styles['Subtitle']} view="p-18" color="secondary">
          Новые коллекции уже здесь! Открывай для себя тренды и классику вместе с нами.
        </Text>
      </div>
      <div className={styles['CategoryTabsContainer']}>
        <CategoryTabs />
      </div>
      <div className={styles['ProductListContainer']}>
        <ProductCardList />
      </div>
    </>
  );
};

export default HomePage;
