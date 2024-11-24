import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useOrder } from 'hooks';
import OrderDetailsCard from './components/OrderDetailsCard';
import OrderProducts from './components/OrderProducts';
import OrderSumCard from './components/OrderSumCard';
import styles from './OrderPage.module.scss';

const OrderPage = () => {
  const { id } = useParams();

  const {
    store: { userOrders },
  } = useOrder();

  const order = userOrders.find((order) => order.id === id);

  return (
    <>
      {order && <OrderProducts orderProducts={order.products} />}
      {order && (
        <div className={styles['OrderInfo']}>
          <OrderDetailsCard order={order} />
          <OrderSumCard orderProducts={order.products} />{' '}
        </div>
      )}
    </>
  );
};

export default observer(OrderPage);
