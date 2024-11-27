import { useCallback } from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { useCart } from 'hooks';
import { TProductId } from 'store/types';
import styles from './Counter.module.scss';

export type CounterProps = {
  productId: TProductId;
  count: number;
};

const Counter: React.FC<CounterProps> = (props) => {
  const { productId, count } = props;

  const {
    store: { setProductCount },
  } = useCart();

  const handleIncreaseButtonClick = useCallback(() => {
    setProductCount(productId, count + 1);
  }, [setProductCount, productId, count]);

  const handleDecreaseButtonClick = useCallback(() => {
    setProductCount(productId, count - 1);
  }, [setProductCount, productId, count]);

  return (
    <div className={styles['Counter']}>
      <Button
        variant="ghost"
        leftContent={<Icon icon="Minus" size={18} />}
        onClick={handleDecreaseButtonClick}
        disabled={count <= 1}
      />
      <Text view="p-18" weight="medium">
        {count}
      </Text>
      <Button variant="ghost" leftContent={<Icon icon="Plus" size={18} />} onClick={handleIncreaseButtonClick} />
    </div>
  );
};

export default Counter;
