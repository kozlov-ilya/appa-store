import classNames from 'classnames';
import { forwardRef } from 'react';

import styles from './TextField.module.scss';

export type TextFieldProps = {
  variant?: 'outline' | 'fill';
  fieldSize?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'md' | 'full';
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
} & React.ComponentPropsWithRef<'input'>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { className, variant = 'fill', fieldSize = 'md', radius = 'full', leftContent, rightContent, ...rest } = props;

  const classname = classNames(
    className,
    styles['TextField'],
    styles[`TextField_variant_${variant}`],
    styles[`TextField_size_${fieldSize}`],
    styles[`TextField_radius_${radius}`],
  );

  return (
    <div className={classname}>
      <label className={styles['Label']}>
        {leftContent && <span className={styles['LeftContent']}>{leftContent}</span>}
        <input className={styles['Control']} ref={ref} {...rest} />
        {rightContent && <span className={styles['RightContent']}>{rightContent}</span>}
        <span className={styles['Box']} />
      </label>
    </div>
  );
});

export default TextField;
