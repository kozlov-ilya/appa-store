import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import Skeleton from 'components/Skeleton';
import Text from 'components/Text';
import { useGetProduct } from 'hooks';
import ProductGallery from './components/ProductGallery';
import styles from './ProductPage.module.scss';

const ProductPage = () => {
  const { id } = useParams();

  const { product, isPending } = useGetProduct(id as string);

  const cn = classNames(styles['ProductPage']);

  return (
    <div className={cn}>
      {isPending && <Skeleton />}
      {product && (
        <div className={styles['Main']}>
          <ProductGallery imgUrls={product.imgUrls} />
          <div className={styles['Content']}>
            <Text className={styles['Name']} view="heading">
              {product.name}
            </Text>
            <Text className={styles['Price']} view="title">
              {`₽ ${product.price}`}
            </Text>
            <div className={styles['DescriptionContainer']}>
              <Text view="p-16" weight="medium">
                Описание
              </Text>
              <Text view="p-16" color="secondary">
                {product.description.slice(2).split(' - ').join('. ') + '.'}
              </Text>
            </div>
            <div className={styles['Actions']}>
              <Button text="Корзина" variant="soft" stretched />
              <Button text="Оплатить" stretched />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
