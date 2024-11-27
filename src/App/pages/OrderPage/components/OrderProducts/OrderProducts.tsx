import { Fragment } from 'react/jsx-runtime';
import Divider from 'components/Divider';
import ProductListItem from 'components/ProductListItem';
import Text from 'components/Text';
import { TCountedProduct } from 'store/types';
import styles from './OrderProducts.module.scss';

export type OrderProductProps = {
  orderProducts: TCountedProduct[];
};

const OrderProducts: React.FC<OrderProductProps> = (props) => {
  const { orderProducts } = props;

  return (
    <div className={styles['OrderProducts']}>
      <Text view="p-24">Товары в заказе</Text>
      {orderProducts.map((countedProduct) => (
        <Fragment key={countedProduct.product.id}>
          <Divider />
          <ProductListItem countedProduct={countedProduct} />
        </Fragment>
      ))}
    </div>
  );
};

export default OrderProducts;
