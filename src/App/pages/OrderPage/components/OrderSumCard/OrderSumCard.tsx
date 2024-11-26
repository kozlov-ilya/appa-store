import ProductsSumCard from 'components/ProductsSumCard';
import { TCountedProduct } from 'store/types';

export type OrderSumCardProps = {
  orderProducts: TCountedProduct[];
};

const OrderSumCard: React.FC<OrderSumCardProps> = (props) => {
  const { orderProducts } = props;

  return <ProductsSumCard countedProducts={orderProducts} />;
};

export default OrderSumCard;
