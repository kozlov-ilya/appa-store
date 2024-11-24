import { Outlet } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import styles from './AuthLayout.module.scss';

const AuthLayout = () => {
  return (
    <div className={styles['AuthLayout']}>
      <Wrapper>
        <div className={styles['Content']}>
          <div className={styles['FormContainer']}>
            <Outlet />
          </div>
          <div className={styles['ImageContainer']}>
            <img className={styles['Image']} src="https://i.imgur.com/QlbOyu5.jpeg" draggable={false} aria-hidden />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AuthLayout;
