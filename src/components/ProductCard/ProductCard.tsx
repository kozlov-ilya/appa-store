import { observer } from 'mobx-react-lite';
import { MouseEventHandler, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Icon from 'components/Icon';
import ProductImage from 'components/ProductImage';
import Text from 'components/Text';
import { useCart } from 'hooks';
import { TProduct } from 'store/types';
import { formatToCurrency } from 'utils/formatToCurrency';
import styles from './ProductCard.module.scss';

export type ProductCardProps = React.ComponentPropsWithoutRef<'div'> & {
  product?: TProduct;
  inCart?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product, inCart, ...rest } = props;

  const {
    store: { addProductToCart, removeProductFromCart },
  } = useCart();

  const handleCartButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();

      if (!product) {
        return;
      }

      if (inCart) {
        removeProductFromCart(product.id);

        return;
      }

      addProductToCart(product);
    },
    [inCart, removeProductFromCart, addProductToCart, product],
  );

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
                {`₽ ${formatToCurrency(product.price)}`}
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
            variant={inCart ? 'solid' : 'ghost'}
            leftContent={<Icon icon="ShoppingBag" size={22} />}
            onClick={handleCartButtonClick}
          />
        ) : (
          <Skeleton containerClassName={styles['CartButtonSkeleton']} />
        )}
        {product && <Link className={styles['ProductLink']} to={`/product/${product.id}`} />}
      </div>
    </div>
  );
};

export default observer(ProductCard);
