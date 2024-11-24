import { observer } from 'mobx-react-lite';
import ProductsSumCard from 'components/ProductsSumCard';
import { useOrder } from 'hooks';

const OrderSumCard = () => {
  const {
    store: { newOrderProducts },
    isNewOrderProductsLoading,
  } = useOrder();

  return <ProductsSumCard countedProducts={newOrderProducts} showProducts isLoading={isNewOrderProductsLoading} />;
};

export default observer(OrderSumCard);
