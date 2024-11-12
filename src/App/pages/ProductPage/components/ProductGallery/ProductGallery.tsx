import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback, useState } from 'react';
import ProductImage from 'components/ProductImage';
import { useMatchMedia } from 'hooks';
import { TProduct } from 'store/types';
import styles from './ProductGallery.module.scss';

export type ProductGalleryProps = {
  product: TProduct;
  className?: string;
};

const ProductGallery: React.FC<ProductGalleryProps> = (props) => {
  const { product, className } = props;
  const { imgUrls } = product;

  const { isDesktop } = useMatchMedia();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: isDesktop ? 'y' : 'x',
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  const cn = classNames(className, styles['ProductGallery']);

  return (
    <div className={cn}>
      <div className={styles['Main']}>
        <div className={styles['Viewport']} ref={emblaMainRef}>
          <div className={styles['Container']}>
            {imgUrls.map((url) => (
              <div className={styles['Slide']} key={url}>
                <ProductImage imgUrl={url} width={600} height={600} radius="md" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles['Thumbs']}>
        <div className={styles['ThumbsViewport']} ref={emblaThumbsRef}>
          <div className={styles['ThumbsContainer']}>
            {imgUrls.map((url, index) => (
              <div className={styles['Thumb']} key={url} data-selected={selectedIndex === index}>
                <ProductImage imgUrl={url} onClick={() => onThumbClick(index)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
