import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { useAuth, useMatchMedia } from 'hooks';
import { ROUTES } from 'routes';
import styles from './ProfileHeader.module.scss';

const ProfileHeader = () => {
  const navigate = useNavigate();

  const {
    store: { user, authUser, logout },
  } = useAuth();

  const { isMobile } = useMatchMedia();

  const handleExitButtonClick = useCallback(async () => {
    const { success } = await logout();

    if (!success) {
      return;
    }

    navigate(ROUTES.home);
  }, [logout, navigate]);

  return (
    <div className={styles['ProfileHeader']}>
      {!user && (
        <div className={styles['LoaderContainer']}>
          <Loader />
        </div>
      )}
      {user && (
        <>
          <Avatar className={styles['Avatar']} imgUrl={authUser?.photoURL || undefined} size={50} />
          <div className={styles['UserInfo']}>
            <Text view="p-20" weight="medium">
              {user?.name}
            </Text>
            <Text view="p-14" color="secondary" className={styles['Email']} maxLines={1}>
              {user?.email}
            </Text>
          </div>
        </>
      )}
      <div className={styles['Actions']}>
        <Button
          text={!isMobile ? 'Выйти' : ''}
          leftContent={<Icon icon="LogOut" size={18} />}
          variant="ghost"
          onClick={handleExitButtonClick}
        />
      </div>
    </div>
  );
};

export default observer(ProfileHeader);
