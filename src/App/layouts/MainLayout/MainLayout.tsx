import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import styles from './MainLayout.module.scss';

const MainLayout = () => {
  const cm = classNames(styles['MainLayout']);

  return (
    <div className={cm}>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default MainLayout;
