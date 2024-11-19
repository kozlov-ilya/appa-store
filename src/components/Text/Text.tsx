import classNames from 'classnames';
import { createElement } from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'heading' | 'button' | 'p-24' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = (props) => {
  const { children, className, view, tag = 'p', weight, color, maxLines } = props;

  const cn = classNames(className, styles['Text'], styles[`Text_view_${view}`], {
    [styles[`Text_weight_${weight}`]]: weight,
    [styles[`Text_color_${color}`]]: color,
  });

  const textComponentProps = {
    className: cn,
    style: { WebkitLineClamp: maxLines },
  };

  const TextComponent = createElement(tag, textComponentProps, children);

  return TextComponent;
};

export default Text;
