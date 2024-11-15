import { useCallback } from 'react';
import Button, { ButtonProps } from 'components/Button';
import { TNamedCategory } from 'store/types';
import styles from './Tab.module.scss';

export type TabProps = {
  category: TNamedCategory;
  onTabClick: (category: TNamedCategory) => void;
  isActive?: boolean;
} & ButtonProps;

const Tab: React.FC<TabProps> = (props) => {
  const { category, isActive, onTabClick, ...rest } = props;

  const handleClick = useCallback(() => onTabClick(category), [category, onTabClick]);

  return (
    <Button
      className={styles['TabButton']}
      text={category.name}
      variant={isActive ? 'solid' : 'soft'}
      key={category.category}
      onClick={handleClick}
      {...rest}
    />
  );
};

export default Tab;
