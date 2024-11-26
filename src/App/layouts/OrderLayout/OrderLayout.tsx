import { Outlet } from 'react-router-dom';
import styles from './OrderLayout.module.scss';

const OrderLayout = () => {
  return (
    <div className={styles['OrderLayout']}>
      <Outlet />
    </div>
  );
};

export default OrderLayout;
