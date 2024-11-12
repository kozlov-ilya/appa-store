import classNames from 'classnames';
import { PRODUCT_IMAGES_BASE_PATH } from 'config/consts';
import styles from './ProductImage.module.scss';

export type ProductImageProps = React.ComponentPropsWithoutRef<'img'> & {
  imgUrl: string;
  radius?: 'sm' | 'md' | 'lg';
};

const ProductImage: React.FC<ProductImageProps> = (props) => {
  const { imgUrl, radius, ...rest } = props;

  const cn = classNames(styles['ProductImage'], { [styles[`ProductImage_radius_${radius}`]]: radius });

  return <img className={cn} src={`${PRODUCT_IMAGES_BASE_PATH}${imgUrl}`} draggable={false} alt="product" {...rest} />;
};

export default ProductImage;
