import Icon from 'components/Icon';
import { ROUTES } from 'routes';
import ProfileTab from './components/ProfileTab';
import styles from './ProfileTabs.module.scss';

const ProfileTabs = () => {
  return (
    <div className={styles['ProfileTabs']}>
      <ProfileTab text="Настройки" link={ROUTES.profile} leftContent={<Icon icon="Settings" size={18} />} />
      <ProfileTab text="Заказы" link={ROUTES.orders} leftContent={<Icon icon="Box" size={18} />} />
    </div>
  );
};

export default ProfileTabs;
