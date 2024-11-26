import { useMatchMedia, useScrollToTop } from 'hooks';
import OrderForm from './components/OrderForm';
import OrderSumCard from './components/OrderSumCard';

const NewOrderPage = () => {
  const { isMobile } = useMatchMedia();

  useScrollToTop();

  return isMobile ? (
    <>
      <OrderSumCard />
      <OrderForm />
    </>
  ) : (
    <>
      <OrderForm />
      <OrderSumCard />
    </>
  );
};

export default NewOrderPage;
