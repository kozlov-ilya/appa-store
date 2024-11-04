import classNames from 'classnames';
import ProductImage from 'components/ProductImage';
import styles from './Thumb.module.scss';

export type ThumbProps = React.ComponentPropsWithoutRef<'div'> & {
  imgUrl: string;
  onClick: () => void;
};

const Thumb: React.FC<ThumbProps> = (props) => {
  const { imgUrl, onClick, ...rest } = props;

  const cn = classNames(styles['Thumb']);

  return (
    <div className={cn} {...rest}>
      <ProductImage imgUrl={imgUrl} onClick={onClick} />
    </div>
  );
};

export default Thumb;
