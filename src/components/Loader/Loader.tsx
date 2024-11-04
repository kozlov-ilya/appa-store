import classNames from 'classnames';
import Icon from '../Icon';
import styles from './Loader.module.scss';

export type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'current' | 'accent';
  className?: string;
};

const Loader: React.FC<LoaderProps> = (props) => {
  const { size = 'md', color = 'current', className } = props;

  const cn = classNames(className, styles['Loader'], styles[`Loader_size_${size}`], styles[`Loader_color_${color}`]);

  return (
    <span className={cn}>
      <Icon icon="Loader" size="100%" className={styles['Icon']} />
    </span>
  );
};

export default Loader;
