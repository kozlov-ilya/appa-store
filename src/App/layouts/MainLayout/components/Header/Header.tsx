import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { ROUTES } from 'config/consts';
import { useMatchMedia } from 'hooks';
import { scrollToTop } from 'utils/scrollToTop';
import styles from './Header.module.scss';

const Header = () => {
  const { isMobile } = useMatchMedia();

  return (
    <div className={styles['Header']}>
      <Link to={ROUTES.home} onClick={() => scrollToTop()}>
        Logo
      </Link>
      <div className={styles['ActionsContainer']}>
        <Button
          component="a"
          to={ROUTES.search}
          text={!isMobile ? 'Поиск' : ''}
          variant="ghost"
          leftContent={<Icon icon="Search" size={18} />}
        />
        <Button
          text={!isMobile ? 'Корзина' : ''}
          component="a"
          to={ROUTES.cart}
          variant="ghost"
          leftContent={<Icon icon="ShoppingBag" size={18} />}
        />
        {!isMobile && <Button text={'Войти'} variant="ghost" leftContent={<Icon icon="User" size={18} />} />}
        {isMobile && <Button variant="ghost" leftContent={<Icon icon="Burger" size={18} />} />}
      </div>
    </div>
  );
};

export default Header;
