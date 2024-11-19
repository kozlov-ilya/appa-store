import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import Button from 'components/Button';
import ProductsSumCard from 'components/ProductsSumCard';
import { ROUTES } from 'config/consts';
import { useCart, useOrder } from 'hooks';

const CartSumCard = () => {
  const {
    store: { cart },
  } = useCart();

  const {
    store: { loadOrderProductsFromCart },
  } = useOrder();

  const handleOrderButtonClick = useCallback(() => {
    loadOrderProductsFromCart();
  }, [loadOrderProductsFromCart]);

  return (
    <ProductsSumCard
      countedProducts={cart}
      ActionButton={
        <Button
          text="Оформить заказ"
          onClick={handleOrderButtonClick}
          component="a"
          to={ROUTES.newOrder}
          disabled={!cart.length}
          size="lg"
        />
      }
    />
  );
};

export default observer(CartSumCard);
