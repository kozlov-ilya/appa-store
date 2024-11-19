import { Outlet } from 'react-router-dom';
import styles from './NewOrderLayout.module.scss';

const NewOrderLayout = () => {
  return (
    <div className={styles['NewOrderLayout']}>
      <Outlet />
    </div>
  );
};

export default NewOrderLayout;
