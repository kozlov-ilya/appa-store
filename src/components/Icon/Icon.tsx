import classNames from 'classnames';
import { icons } from './icons';
import styles from './Icon.module.scss';

export type IconName = keyof typeof icons;

export type IconProps = React.SVGAttributes<SVGElement> & {
  icon: IconName;
  size?: number | string;
};

const Icon: React.FC<IconProps> = (props) => {
  const { icon, size = 24, className, style, ...rest } = props;

  const IconComponent = icons[icon];

  const cn = classNames(className, styles['Icon']);

  return <IconComponent className={cn} style={{ width: size, height: size, ...style }} {...rest} />;
};

export default Icon;
