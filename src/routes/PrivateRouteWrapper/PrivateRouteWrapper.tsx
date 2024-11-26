import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks';
import { ROUTES } from '../routes';

const PrivateRouteWrapper = () => {
  const {
    store: { authUser },
    isAuthLoading,
  } = useAuth();

  const isUserLoggedIn = !!authUser;

  return isAuthLoading ? null : isUserLoggedIn ? <Outlet /> : <Navigate to={ROUTES.login} replace />;
};

export default observer(PrivateRouteWrapper);
