import classNames from 'classnames';
import { PRODUCT_IMAGES_BASE_PATH } from 'configs/consts';
import styles from './ProductImage.module.scss';

export type ProductImageProps = React.ComponentPropsWithoutRef<'img'> & {
  imgUrl: string;
};

const ProductImage: React.FC<ProductImageProps> = (props) => {
  const { imgUrl, ...rest } = props;

  const cn = classNames(styles['ProductImage']);

  return <img className={cn} src={`${PRODUCT_IMAGES_BASE_PATH}${imgUrl}`} draggable={false} alt="product" {...rest} />;
};

export default ProductImage;
