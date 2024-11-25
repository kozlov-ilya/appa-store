import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import Button from 'components/Button';
import ProductsSumCard from 'components/ProductsSumCard';
import { useOrder } from 'hooks';

const OrderSumCard = () => {
  const {
    store: { orderProducts, submitOrder },
  } = useOrder();

  const handlePayButtonClick = useCallback(() => {
    submitOrder();
  }, [submitOrder]);

  return (
    <ProductsSumCard
      countedProducts={orderProducts}
      showProducts
      ActionButton={<Button text="Оплатить" onClick={handlePayButtonClick} size="lg" />}
    />
  );
};

export default observer(OrderSumCard);
