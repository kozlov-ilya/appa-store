import { observer } from 'mobx-react-lite';
import { Fragment } from 'react/jsx-runtime';
import Divider from 'components/Divider';
import Loader from 'components/Loader';
import ProductListItem from 'components/ProductListItem';
import Text from 'components/Text';
import { useCart } from 'hooks';
import styles from './CartList.module.scss';

const CartList = () => {
  const {
    store: { cart },
    isLoading,
  } = useCart();

  return (
    <div className={styles['CartList']}>
      <Text view="p-24">{`Корзина [ ${cart.length} ]`}</Text>
      {isLoading && (
        <div className={styles['LoaderContainer']}>
          <Loader size="lg" />
        </div>
      )}
      {!cart.length && !isLoading && (
        <div className={styles['CartPlaceholder']}>
          <Text view="p-20" color="secondary">
            В корзине нет товаров
          </Text>
        </div>
      )}
      {cart.map((countedProduct) => (
        <Fragment key={countedProduct.product.id}>
          <Divider />
          <ProductListItem countedProduct={countedProduct} withActions />
        </Fragment>
      ))}
    </div>
  );
};

export default observer(CartList);
