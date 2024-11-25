import classNames from 'classnames';
import styles from './ProductImage.module.scss';

export type ProductImageProps = React.ComponentPropsWithoutRef<'img'> & {
  imgUrl: string;
  radius?: 'sm' | 'md' | 'lg';
};

const ProductImage: React.FC<ProductImageProps> = (props) => {
  const { imgUrl, radius, ...rest } = props;

  const cn = classNames(styles['ProductImage'], { [styles[`ProductImage_radius_${radius}`]]: radius });

  return (
    <img className={cn} src={imgUrl.replace('imgur', 'i.imgur') + '.jpeg'} draggable={false} alt="product" {...rest} />
  );
};

export default ProductImage;
