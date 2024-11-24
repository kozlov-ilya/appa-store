import Text from 'components/Text';
import { NAMED_ORDER_FIELDS } from 'config/consts';
import { TOrder } from 'store/types';
import { formatDate } from 'utils/formatDate';
import styles from './OrderDetailsCard.module.scss';

export type OrderDetailsCardProps = {
  order: TOrder;
};

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = (props) => {
  const { order } = props;

  const details = Object.entries({ ...order.details, date: formatDate(order.date) });

  return (
    <div className={styles['OrderDetailsCard']}>
      {details.map(([field, value]) => (
        <div className={styles['Line']} key={field}>
          <Text weight="medium">{NAMED_ORDER_FIELDS[field]}</Text>
          <Text>{value}</Text>
        </div>
      ))}
    </div>
  );
};

export default OrderDetailsCard;
