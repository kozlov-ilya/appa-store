import classNames from 'classnames';
import styles from './Skeleton.module.scss';

const Skeleton = () => {
  const cn = classNames(styles['Skeleton']);

  return <div className={cn}>Loading...</div>;
};

export default Skeleton;
