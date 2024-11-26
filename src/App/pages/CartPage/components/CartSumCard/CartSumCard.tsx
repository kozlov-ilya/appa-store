import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import Button from 'components/Button';
import ProductsSumCard from 'components/ProductsSumCard';
import { useCart, useOrder } from 'hooks';
import { ROUTES } from 'routes';

const CartSumCard = () => {
  const {
    store: { cart },
  } = useCart();

  const {
    store: { loadNewOrderProductsFromCart },
  } = useOrder();

  const handleOrderButtonClick = useCallback(() => {
    loadNewOrderProductsFromCart();
  }, [loadNewOrderProductsFromCart]);

  return (
    <ProductsSumCard
      countedProducts={cart}
      ActionButton={
        <Button
          text="Перейти к оформлению"
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
