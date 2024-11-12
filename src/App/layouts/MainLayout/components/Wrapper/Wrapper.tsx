import styles from './Wrapper.module.scss';

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles['Wrapper']}>{children}</div>;
};

export default Wrapper;
