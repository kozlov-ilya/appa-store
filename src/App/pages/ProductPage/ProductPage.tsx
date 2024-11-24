import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { useCart, useOrder } from 'hooks';
import { ROUTES } from 'routes';
import ProductStore from 'store/ProductStore';
import { Meta } from 'store/types';
import { formatToCurrency } from 'utils/formatToCurrency';
import { useLocalStore } from 'utils/useLocalStore';
import ProductGallery from './components/ProductGallery';
import styles from './ProductPage.module.scss';

const ProductPage = () => {
  const { id } = useParams();

  const {
    store: { setNewOrderProducts },
  } = useOrder();

  const {
    store: { addProductToCart, removeProductFromCart, cart },
  } = useCart();

  const productStore = useLocalStore(() => new ProductStore());

  const { product, meta } = productStore;

  useEffect(() => {
    productStore.loadProduct(id);
  }, [productStore, id]);

  const inCart = !!cart.find((p) => p.product.id === product?.id);

  const handleCartButtonClick = useCallback(() => {
    if (!product) {
      return;
    }

    if (inCart) {
      removeProductFromCart(product.id);

      return;
    }

    addProductToCart(product);
  }, [addProductToCart, product, removeProductFromCart, inCart]);

  const handleOrderButtonClick = useCallback(() => {
    if (!product) {
      return;
    }

    setNewOrderProducts([{ product, count: 1 }]);
  }, [setNewOrderProducts, product]);

  return (
    <div>
      {meta === Meta.loading && (
        <div className={styles['LoaderContainer']}>
          <Loader size="lg" />
        </div>
      )}
      {product && (
        <div className={styles['Main']}>
          <ProductGallery product={product} className={styles['Gallery']} />
          <div className={styles['Content']}>
            <Text className={styles['Name']} view="heading">
              {product.name}
            </Text>
            <Text className={styles['Price']} view="title">
              {`₽ ${formatToCurrency(product.price)}`}
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
              <Button
                text={inCart ? 'Убрать' : 'Добавить'}
                variant={inCart ? 'solid' : 'soft'}
                stretched
                size="lg"
                onClick={handleCartButtonClick}
                leftContent={<Icon icon="ShoppingBag" />}
              />
              <Button
                text="Оформить"
                stretched
                size="lg"
                onClick={handleOrderButtonClick}
                component="a"
                to={`${ROUTES.newOrder}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(ProductPage);
