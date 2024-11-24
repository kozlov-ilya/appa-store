import Link from 'components/Link';
import Text from 'components/Text';
import { ROUTES } from 'routes';
import { TOrder } from 'store/types';
import { calcProductsCost } from 'utils/calcProductsCost';
import { formatDate } from 'utils/formatDate';
import { formatToCurrency } from 'utils/formatToCurrency';
import styles from './OrderItem.module.scss';

export type OrderItemProps = {
  order: TOrder;
};

const OrderItem: React.FC<OrderItemProps> = (props) => {
  const { order } = props;

  return (
    <div className={styles['OrderItem']}>
      <div className={styles['Header']}>
        <Text>
          {'№ '}
          <Link to={`${ROUTES.order}/${order.id}`} color="accent">
            {order.id}
          </Link>
        </Text>
        <Text weight="medium">{`₽ ${formatToCurrency(calcProductsCost(order.products))}`}</Text>
      </div>
      <Text color="secondary" view="p-14">
        {formatDate(order.date)}
      </Text>
    </div>
  );
};

export default OrderItem;
