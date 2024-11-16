import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import styles from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <div className={styles['MainLayout']}>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default MainLayout;
