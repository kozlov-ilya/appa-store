import { observer } from 'mobx-react-lite';
import { Fragment } from 'react/jsx-runtime';
import Divider from 'components/Divider';
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
      <Text view="p-24">Корзина</Text>
      {isLoading &&
        Array.from(Array(5)).map((_, ind) => (
          <Fragment key={ind}>
            <Divider />
            <ProductListItem />
          </Fragment>
        ))}
      {cart.map(({ product }) => (
        <Fragment key={product.id}>
          <Divider />
          <ProductListItem product={product} withActions />
        </Fragment>
      ))}
    </div>
  );
};

export default observer(CartList);
