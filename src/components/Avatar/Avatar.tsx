import * as RadixAvatar from '@radix-ui/react-avatar';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';
import styles from './Avatar.module.scss';

export type AvatarProps = {
  imgUrl?: string;
  link?: string;
  size?: number;
} & RadixAvatar.AvatarProps;

const Avatar: React.FC<AvatarProps> = (props) => {
  const { imgUrl, link, size = 40, className, ...rest } = props;

  const cn = classNames(className, styles['Avatar']);

  return (
    <RadixAvatar.Root className={cn} {...rest} style={{ width: size, height: size }}>
      <RadixAvatar.Image className={styles['Image']} src={imgUrl} alt="user avatar" draggable={false} />
      <RadixAvatar.Fallback className={styles['Fallback']}>
        <Icon icon="User" />
      </RadixAvatar.Fallback>
      {link && <Link className={styles['Link']} to={link} />}
    </RadixAvatar.Root>
  );
};

export default Avatar;
