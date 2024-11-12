import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import ProductCard from 'components/ProductCard';
import { useProducts } from 'hooks';
import { declOfNum } from 'utils/declOfNum';
import styles from './ProductList.module.scss';

const ProductList = () => {
  const { isLoading, products, loadProducts, productsCount } = useProducts();

  return (
    <div className={styles['ProductListContainer']}>
      <div className={styles['ProductsCount']}>
        {!isLoading ? (
          `( ${productsCount} ${declOfNum(productsCount, ['Товар', 'Товара', 'Товаров'])} Доступно )`
        ) : (
          <Skeleton width={150} />
        )}
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={() => loadProducts()}
        hasMore={productsCount - products.length > 0}
        loader={null}
        className={styles['ProductList']}
      >
        {isLoading && !products.length && Array.from(Array(8)).map((_, ind) => <ProductCard key={ind} />)}
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default observer(ProductList);
