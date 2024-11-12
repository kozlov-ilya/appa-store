import classNames from 'classnames';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { categories } from 'configs/consts';
import styles from './CategoryTabs.module.scss';

const CategoryTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'jackets';

  useEffect(() => {
    if (!searchParams.get('category')) {
      setSearchParams({ category: 'jackets' });
    }
  }, [searchParams, setSearchParams]);

  const cn = classNames(styles['CategoryTabs']);

  return (
    <div className={cn}>
      {categories.map((category) => (
        <Button
          className={styles['TabButton']}
          text={category.name}
          variant={currentCategory === category.value ? 'solid' : 'soft'}
          key={category.value}
          onClick={() => {
            setSearchParams({ category: category.value });
          }}
        />
      ))}
      <Button className={styles['FiltersButton']} variant="soft" leftContent={<Icon icon="Sliders" size={18} />} />
    </div>
  );
};

export default CategoryTabs;
