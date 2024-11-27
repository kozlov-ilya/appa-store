import { observer } from 'mobx-react-lite';
import { Fragment } from 'react/jsx-runtime';
import Divider from 'components/Divider';
import Loader from 'components/Loader';
import ProductListItem from 'components/ProductListItem';
import Text from 'components/Text';
import { TCountedProduct } from 'store/types';
import { calcProductsCost } from 'utils/calcProductsCost';
import { formatToCurrency } from 'utils/formatToCurrency';
import styles from './ProductsSumCard.module.scss';

export type ProductsSumCardProps = {
  countedProducts?: TCountedProduct[];
  showProducts?: boolean;
  ActionButton?: React.ReactNode;
  isLoading?: boolean;
};

const ProductsSumCard: React.FC<ProductsSumCardProps> = (props) => {
  const { countedProducts, showProducts = false, ActionButton, isLoading } = props;

  const sumCost = formatToCurrency(calcProductsCost(countedProducts));

  return (
    <div className={styles['ProductsSumCard']}>
      {showProducts && (
        <div className={styles['ProductList']}>
          <Text weight="medium" view="p-18">
            Товары в заказе
          </Text>
          {isLoading && <Loader size="lg" className={styles['Loader']} />}
          {!!countedProducts?.length &&
            countedProducts.map((countedProduct) => (
              <Fragment key={countedProduct.product.id}>
                <ProductListItem countedProduct={countedProduct} />
                <Divider />
              </Fragment>
            ))}
        </div>
      )}
      <div className={styles['Details']}>
        <div className={styles['InfoRow']}>
          <Text color="secondary">Сумма заказа</Text>
          <Text weight="medium">{`₽ ${sumCost}`}</Text>
        </div>
        <div className={styles['InfoRow']}>
          <Text color="secondary">Скидка</Text>
          <Text weight="medium">{`₽ ${0}`}</Text>
        </div>
      </div>
      <Divider />
      <div className={styles['Main']}>
        <div className={styles['InfoRow']}>
          <Text weight="medium" view="p-18">
            Стоимость
          </Text>
          <Text weight="bold" view="p-20">{`₽ ${sumCost}`}</Text>
        </div>
        {ActionButton}
      </div>
    </div>
  );
};

export default observer(ProductsSumCard);
