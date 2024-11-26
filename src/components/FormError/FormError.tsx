import classNames from 'classnames';
import Icon from 'components/Icon';
import styles from './FormError.module.scss';

export type FormErrorProps = {
  text: string;
} & React.ComponentPropsWithoutRef<'div'>;

const FormError: React.FC<FormErrorProps> = (props) => {
  const { text, className } = props;

  const cn = classNames(className, styles['FormError']);

  return (
    <div className={cn}>
      <Icon icon="Error" size={18} className={styles['Icon']} />
      <span className={styles['Message']}>{text}</span>
    </div>
  );
};

export default FormError;
