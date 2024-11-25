import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import ProductCard from 'components/ProductCard';
import { useCart, useProducts } from 'hooks';
import { declOfNum } from 'utils/declOfNum';
import styles from './ProductCardList.module.scss';

const ProductCardList = () => {
  const { isLoading, products, loadProducts, productsCount } = useProducts();
  const {
    store: { cart },
  } = useCart();

  return (
    <div>
      <div className={styles['ProductsCount']}>
        {!(productsCount === null) ? (
          `( ${productsCount} ${declOfNum(productsCount, ['Товар', 'Товара', 'Товаров'])} Доступно )`
        ) : (
          <Skeleton width={150} />
        )}
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={loadProducts}
        hasMore={productsCount ? productsCount - products.length > 0 : false}
        loader={null}
        className={styles['ProductCardList']}
      >
        {isLoading && !products.length && Array.from(Array(8)).map((_, ind) => <ProductCard key={ind} />)}
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            inCart={!!cart.find((item) => item.product.id === product.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default observer(ProductCardList);
