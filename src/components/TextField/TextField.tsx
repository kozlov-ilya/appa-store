import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';

import styles from './TextField.module.scss';

export type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  variant?: 'outline' | 'fill';
  fieldSize?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'md' | 'full';
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  focused?: boolean;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    className,
    variant = 'fill',
    fieldSize = 'md',
    radius = 'full',
    value,
    onChange,
    leftContent,
    rightContent,
    focused,
    ...rest
  } = props;

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  const classname = classNames(
    className,
    styles['TextField'],
    styles[`TextField_variant_${variant}`],
    styles[`TextField_size_${fieldSize}`],
    styles[`TextField_radius_${radius}`],
    {
      [styles['TextField_focused']]: focused,
    },
  );

  return (
    <div className={classname}>
      <label className={styles['Label']}>
        {leftContent && <span className={styles['LeftContent']}>{leftContent}</span>}
        <input className={styles['Control']} type="text" value={value} onChange={onInputChange} ref={ref} {...rest} />
        {rightContent && <span className={styles['RightContent']}>{rightContent}</span>}
        <span className={styles['Box']} />
      </label>
    </div>
  );
});

export default observer(TextField);
