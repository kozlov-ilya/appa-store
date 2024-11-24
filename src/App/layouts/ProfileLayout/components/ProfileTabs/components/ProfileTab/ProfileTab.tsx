import { useLocation } from 'react-router-dom';
import Button from 'components/Button';
import { useMatchMedia } from 'hooks';

export type ProfileTabProps = {
  text: string;
  link: string;
  leftContent?: React.ReactNode;
};

const ProfileTab: React.FC<ProfileTabProps> = (props) => {
  const { text, link, leftContent } = props;

  const { isMobile } = useMatchMedia();

  const { pathname } = useLocation();

  return (
    <Button
      text={text}
      component="a"
      to={link}
      variant={pathname === link ? 'solid' : 'ghost'}
      stretched
      radius="md"
      leftContent={leftContent}
      align={isMobile ? 'center' : 'start'}
    />
  );
};

export default ProfileTab;
