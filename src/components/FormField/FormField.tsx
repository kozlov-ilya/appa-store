import { forwardRef } from 'react';
import Text from 'components/Text';
import styles from './FormField.module.scss';

export type FormFieldProps = {
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
} & React.ComponentPropsWithRef<'label'>;

const FormField = forwardRef<HTMLLabelElement, FormFieldProps>((props, ref) => {
  const { label, isRequired, errorMessage, children, ...rest } = props;

  return (
    <label className={styles['FormField']} ref={ref} {...rest}>
      {label && <Text className={styles['Label']} weight="medium">{`${label}${isRequired ? ' *' : ''}`}</Text>}
      <span className={styles['Control']}>
        {children}
        {errorMessage && (
          <Text className={styles['ErrorMessage']} view="p-14">
            {errorMessage}
          </Text>
        )}
      </span>
    </label>
  );
});

export default FormField;
