import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { TProduct } from 'store/types';
import ProductImage from '../ProductImage';
import styles from './ProductCard.module.scss';

export type ProductCardProps = React.ComponentPropsWithoutRef<'div'> & {
  product?: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product, ...rest } = props;

  return (
    <div className={styles['ProductCard']} {...rest}>
      <div className={styles['Header']}>
        {product ? (
          <ProductImage imgUrl={product.imgUrls[0]} width={300} height={350} />
        ) : (
          <Skeleton containerClassName={styles['ImageSkeleton']} />
        )}
      </div>
      <div className={styles['Body']}>
        <div className={styles['Info']}>
          {product ? (
            <>
              <Text view="p-16" maxLines={1} className={styles['Name']}>
                {product.name}
              </Text>
              <Text view="p-18" weight="medium">
                {`₽ ${product.price}`}
              </Text>
            </>
          ) : (
            <>
              <Skeleton containerClassName={styles['NameSkeleton']} />
              <Skeleton containerClassName={styles['PriceSkeleton']} />
            </>
          )}
        </div>
        {product ? (
          <Button
            className={styles['CartButton']}
            variant="ghost"
            leftContent={<Icon icon="ShoppingBag" size={22} />}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        ) : (
          <Skeleton containerClassName={styles['CartButtonSkeleton']} />
        )}
        {product && <Link className={styles['ProductLink']} to={`/product/${product.id}`} />}
      </div>
    </div>
  );
};

export default ProductCard;
