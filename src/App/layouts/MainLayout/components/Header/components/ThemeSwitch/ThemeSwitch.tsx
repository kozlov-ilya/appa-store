import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  const themeToSwitch = theme === 'dark' ? 'light' : 'dark';

  const handleSwitchClick = useCallback(() => {
    setTheme(themeToSwitch);
  }, [setTheme, themeToSwitch]);

  return (
    <Button
      onClick={handleSwitchClick}
      variant="ghost"
      leftContent={<Icon icon={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />}
    />
  );
};

export default ThemeSwitch;
