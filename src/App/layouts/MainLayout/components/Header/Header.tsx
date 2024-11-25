import { observer } from 'mobx-react-lite';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import { useAuth, useMatchMedia } from 'hooks';
import { ROUTES } from 'routes';
import Logo from './components/Logo';
import ThemeSwitch from './components/ThemeSwitch';
import styles from './Header.module.scss';

const Header = () => {
  const { isMobile } = useMatchMedia();

  const {
    store: { authUser },
    isAuthLoading,
  } = useAuth();

  return (
    <div className={styles['Header']}>
      <Logo />
      <div className={styles['ActionsContainer']}>
        <ThemeSwitch />
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
        {isAuthLoading && <Loader size="md" />}
        {!isAuthLoading && !!authUser && <Avatar imgUrl={authUser.photoURL || undefined} link={ROUTES.profile} />}
        {!isAuthLoading && !authUser && (
          <Button
            text={'Войти'}
            component="a"
            to={ROUTES.login}
            variant="ghost"
            leftContent={<Icon icon="User" size={18} />}
          />
        )}
      </div>
    </div>
  );
};

export default observer(Header);
