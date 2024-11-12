import Button, { ButtonProps } from 'components/Button';
import { TNamedCategory } from 'store/types';
import styles from './Tab.module.scss';

export type TabProps = {
  category: TNamedCategory;
  isActive?: boolean;
} & ButtonProps;

const Tab: React.FC<TabProps> = (props) => {
  const { category, isActive, ...rest } = props;

  return (
    <Button
      className={styles['TabButton']}
      text={category.name}
      variant={isActive ? 'solid' : 'soft'}
      key={category.category}
      {...rest}
    />
  );
};

export default Tab;
