import { Outlet } from 'react-router-dom';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import styles from './ProfileLayout.module.scss';

const ProfileLayout = () => {
  return (
    <div className={styles['ProfileLayout']}>
      <ProfileHeader />
      <div className={styles['Body']}>
        <ProfileTabs />
        <div className={styles['PageContainer']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
