import { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import Button from 'components/Button';
import Icon from 'components/Icon';
import ProductImage from 'components/ProductImage';
import Text from 'components/Text';
import { useCart } from 'hooks';
import { TProduct } from 'store/types';
import { formatToCurrency } from 'utils/formatToCurrency';
import styles from './ProductListItem.module.scss';

export type ProductListItemProps = {
  product?: TProduct;
  withActions?: boolean;
};

const ProductListItem: React.FC<ProductListItemProps> = (props) => {
  const { product, withActions } = props;

  const {
    store: { removeProductFromCart },
  } = useCart();

  const handleRemoveButtonClick = useCallback(() => {
    if (!product) {
      return;
    }

    removeProductFromCart(product.id);
  }, [product, removeProductFromCart]);

  return product ? (
    <div className={styles['ProductListItem']}>
      <div className={styles['ImageContainer']}>
        <ProductImage imgUrl={product.imgUrls[0]} radius="md" />
      </div>
      <div className={styles['Info']}>
        <Text className={styles['Name']} maxLines={2}>
          {product.name}
        </Text>
        <Text className={styles['Price']} view="p-18" weight="medium">
          {`₽ ${formatToCurrency(product.price)}`}
        </Text>
      </div>
      {withActions && (
        <div className={styles['Actions']}>
          <Button
            text="Удалить"
            onClick={handleRemoveButtonClick}
            variant="ghost"
            leftContent={<Icon icon="Trash" size={18} />}
          />
        </div>
      )}
    </div>
  ) : (
    <Skeleton containerClassName={styles['CartItemSkeleton']} />
  );
};

export default ProductListItem;
