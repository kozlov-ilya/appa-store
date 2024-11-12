import useEmblaCarousel from 'embla-carousel-react';
import { observer } from 'mobx-react-lite';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { NAMED_CATEGORIES } from 'config/consts';
import { useMatchMedia } from 'hooks';
import { useSearchQuery } from 'hooks/useSearchQuery';
import rootStore from 'store/RootStore';
import { Meta } from 'store/types';
import Tab from './components/Tab';
import styles from './CategoryTabs.module.scss';

const CategoryTabs = () => {
  const { isMobile } = useMatchMedia();

  const { setQueryParam } = useSearchQuery();

  const { searchQueryStore, productsStore } = rootStore;

  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  const Tabs = NAMED_CATEGORIES.map((category) => (
    <Tab
      key={category.category}
      category={category}
      isActive={searchQueryStore.getParam('category') === category.category}
      disabled={productsStore.meta === Meta.loading || productsStore.meta === Meta.initial}
      onClick={() => setQueryParam('category', category.category)}
    />
  ));

  return (
    <div className={styles['CategoryTabs']}>
      <Button className={styles['FiltersButton']} variant="soft" leftContent={<Icon icon="Sliders" size={18} />} />
      {isMobile ? (
        <div className={styles['Viewport']} ref={emblaRef}>
          <div className={styles['Container']}>{Tabs}</div>
        </div>
      ) : (
        Tabs
      )}
    </div>
  );
};

export default observer(CategoryTabs);
