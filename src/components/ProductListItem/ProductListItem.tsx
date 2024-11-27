import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Link from 'components/Link';
import ProductImage from 'components/ProductImage';
import Text from 'components/Text';
import { useCart } from 'hooks';
import { ROUTES } from 'routes';
import { TCountedProduct } from 'store/types';
import { formatToCurrency } from 'utils/formatToCurrency';
import Counter from './components/Counter';
import styles from './ProductListItem.module.scss';

export type ProductListItemProps = {
  countedProduct: TCountedProduct;
  withActions?: boolean;
};

const ProductListItem: React.FC<ProductListItemProps> = (props) => {
  const {
    countedProduct: { product, count },
    withActions,
  } = props;

  const {
    store: { removeProductFromCart },
  } = useCart();

  const handleRemoveButtonClick = useCallback(() => {
    if (!product) {
      return;
    }

    removeProductFromCart(product.id);
  }, [product, removeProductFromCart]);

  return (
    <div className={styles['ProductListItem']}>
      <div className={styles['ImageContainer']}>
        <ProductImage imgUrl={product.imgUrls[0]} radius="md" />
      </div>
      <div className={styles['Info']}>
        <Text className={styles['Name']} maxLines={2}>
          <Link to={`${ROUTES.product}/${product.id}`}>{product.name}</Link>
        </Text>
        <Text className={styles['Price']} view="p-18" weight="medium">
          {`₽ ${formatToCurrency(product.price * count)} (x${count})`}
        </Text>
      </div>
      {withActions && (
        <div className={styles['Actions']}>
          <Counter productId={product.id} count={count} />
          <Button
            text="Удалить"
            onClick={handleRemoveButtonClick}
            variant="ghost"
            leftContent={<Icon icon="Trash" size={18} />}
          />
        </div>
      )}
    </div>
  );
};

export default observer(ProductListItem);
