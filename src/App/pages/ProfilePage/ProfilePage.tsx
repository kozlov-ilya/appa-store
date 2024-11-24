import { observer } from 'mobx-react-lite';
import SettingsForm from './components/SettingsForm';

const ProfilePage = () => {
  return (
    <>
      <SettingsForm />
    </>
  );
};

export default observer(ProfilePage);
