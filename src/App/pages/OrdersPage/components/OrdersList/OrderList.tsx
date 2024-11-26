import { observer } from 'mobx-react-lite';
import { Fragment } from 'react/jsx-runtime';
import Divider from 'components/Divider';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { useAuth, useOrder } from 'hooks';
import OrderItem from './components/OrderItem';
import styles from './OrderList.module.scss';

const OrderList = () => {
  const {
    store: { userOrders },
    isUserOrdersLoading,
  } = useOrder();

  const { isUserLoading } = useAuth();

  return (
    <div className={styles['OrderList']}>
      <div className={styles['Header']}>
        <Text view="p-24" weight="medium">
          {`Заказы [ ${userOrders.length} ]`}
        </Text>
      </div>
      <div className={styles['Body']}>
        {(isUserOrdersLoading || isUserLoading) && (
          <div className={styles['LoaderContainer']}>
            <Loader size="lg" />
          </div>
        )}
        {[...userOrders]
          .sort((a, b) => (a.date > b.date ? -1 : 1))
          .map((order) => (
            <Fragment key={order.id}>
              <OrderItem order={order} />
              <Divider />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default observer(OrderList);
