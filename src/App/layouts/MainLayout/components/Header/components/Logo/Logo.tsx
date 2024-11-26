import Link from 'components/Link';
import Text from 'components/Text';
import { ROUTES } from 'routes';
import { scrollToTop } from 'utils/scrollToTop';

const Logo = () => {
  return (
    <Text view="heading" weight="bold">
      <Link to={ROUTES.home} onClick={() => scrollToTop()}>
        APPA
      </Link>
    </Text>
  );
};

export default Logo;
