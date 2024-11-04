import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import ProductCard from 'components/ProductCard';
import { TProduct } from 'types/product';
import styles from './ProductList.module.scss';

export type ProductListProps = {
  products: TProduct[];
};

const ProductList: React.FC<ProductListProps> = (props) => {
  const { products } = props;

  const navigate = useNavigate();

  const cn = classNames(styles['ProductList']);

  return (
    <div className={cn}>
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onClick={() => {
            navigate(`/product/${product.id}`);
          }}
        />
      ))}
    </div>
  );
};

export default ProductList;
