import classNames from 'classnames';
import styles from './Wrapper.module.scss';

export type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { children } = props;

  const cn = classNames(styles['Wrapper']);

  return <div className={cn}>{children}</div>;
};

export default Wrapper;
