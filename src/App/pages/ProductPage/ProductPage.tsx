import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import Skeleton from 'components/Skeleton';
import Text from 'components/Text';
import ProductStore from 'store/ProductStore';
import { Meta } from 'store/types';
import { useLocalStore } from 'utils/useLocalStore';
import ProductGallery from './components/ProductGallery';
import styles from './ProductPage.module.scss';

const ProductPage = () => {
  const { id } = useParams();

  const productStore = useLocalStore(() => new ProductStore());

  const { product, meta } = productStore;

  useEffect(() => {
    productStore.loadProduct(id);
  }, [productStore, id]);

  return (
    <div>
      {meta === Meta.loading && <Skeleton />}
      {product && (
        <div className={styles['Main']}>
          <ProductGallery product={product} className={styles['Gallery']} />
          <div className={styles['Content']}>
            <Text className={styles['Name']} view="heading">
              {product.name}
            </Text>
            <Text className={styles['Price']} view="title">
              {`₽ ${product.price}`}
            </Text>
            <div className={styles['DescriptionContainer']}>
              <Text view="p-16" weight="medium">
                Описание
              </Text>
              <Text view="p-16" color="secondary">
                {product.description.slice(2).split(' - ').join('. ') + '.'}
              </Text>
            </div>
            <div className={styles['Actions']}>
              <Button text="Корзина" variant="soft" stretched />
              <Button text="Оплатить" stretched />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ProductPage);
