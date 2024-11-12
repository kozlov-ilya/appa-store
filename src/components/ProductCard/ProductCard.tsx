import classNames from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { TProduct } from 'types';
import ProductImage from '../ProductImage';
import styles from './ProductCard.module.scss';

export type ProductCardProps = React.ComponentPropsWithoutRef<'div'> & {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product, ...rest } = props;
  const { name, price, imgUrls } = product;

  const cn = classNames(styles['ProductCard']);

  return (
    <div className={cn} {...rest}>
      <div className={styles['Header']}>
        <ProductImage imgUrl={imgUrls[0]} width={300} height={350} />
      </div>
      <div className={styles['Body']}>
        <div className={styles['Info']}>
          <Text view="p-16" maxLines={1} className={styles['Name']}>
            {name}
          </Text>
          <Text view="p-18" weight="medium">
            {`₽ ${price}`}
          </Text>
        </div>
        <Button
          variant="ghost"
          leftContent={<Icon icon="ShoppingBag" size={22} />}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
