import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import Loader from 'components/Loader';
import Text from '../Text';
import styles from './Button.module.scss';

type ButtonAsButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> & { component?: 'button' };
type ButtonAsLinkProps = LinkProps & { component: 'a' };

export type ButtonProps = (ButtonAsButtonProps | ButtonAsLinkProps) & {
  text?: string;
  variant?: 'solid' | 'ghost' | 'soft';
  radius?: 'none' | 'md' | 'full';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'bold';
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  stretched?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    text,
    component = 'button',
    variant = 'solid',
    radius = 'full',
    size = 'md',
    weight = 'normal',
    leftContent,
    rightContent,
    stretched,
    loading,
    disabled,
    ...rest
  } = props;

  const cn = classNames(
    className,
    styles['Button'],
    styles[`Button_variant_${variant}`],
    styles[`Button_radius_${radius}`],
    styles[`Button_size_${size}`],
    {
      [styles[`Button_stretched`]]: stretched,
      [styles[`Button_disabled`]]: disabled,
      [styles[`Button_type_icon`]]: !text,
    },
  );

  if (component === 'a') {
    return (
      <Link className={cn} {...(rest as ButtonAsLinkProps)}>
        {!loading ? (
          <>
            {leftContent}
            {text && (
              <Text view="button" tag="span" weight={weight}>
                {text}
              </Text>
            )}
            {rightContent}
          </>
        ) : (
          <Loader />
        )}
      </Link>
    );
  }

  return (
    <button className={cn} {...(rest as ButtonAsButtonProps)} disabled={disabled}>
      {!loading ? (
        <>
          {leftContent}
          {text && (
            <Text view="button" tag="span" weight={weight}>
              {text}
            </Text>
          )}
          {rightContent}
        </>
      ) : (
        <Loader />
      )}
    </button>
  );
};

export default Button;
