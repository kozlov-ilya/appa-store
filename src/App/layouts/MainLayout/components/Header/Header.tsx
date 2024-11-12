import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { useMatchMedia } from 'hooks';
import styles from './Header.module.scss';

const Header = () => {
  const { isMobile } = useMatchMedia();

  const cn = classNames(styles['Header']);

  return (
    <div className={cn}>
      <Link to={'/'}>Logo</Link>
      <div className={styles['ActionsContainer']}>
        <Button text={!isMobile ? 'Поиск' : ''} variant="ghost" leftContent={<Icon icon="Search" size={18} />} />
        <Button text={!isMobile ? 'Корзина' : ''} variant="ghost" leftContent={<Icon icon="ShoppingBag" size={18} />} />
        {!isMobile && <Button text={'Войти'} variant="ghost" leftContent={<Icon icon="User" size={18} />} />}
        {isMobile && <Button variant="ghost" leftContent={<Icon icon="Burger" size={18} />} />}
      </div>
    </div>
  );
};

export default Header;
