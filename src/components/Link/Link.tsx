import classNames from 'classnames';
import { Link as ReactLink, LinkProps as ReactLinkProps } from 'react-router-dom';
import styles from './Link.module.scss';

export type LinkProps = {
  color?: 'accent' | 'primary';
} & ReactLinkProps;

const Link: React.FC<LinkProps> = (props) => {
  const { children, color = 'primary', className, ...rest } = props;

  const cn = classNames(className, styles['Link'], styles[`Link_color_${color}`]);

  return (
    <ReactLink className={cn} {...rest}>
      {children}
    </ReactLink>
  );
};

export default Link;
