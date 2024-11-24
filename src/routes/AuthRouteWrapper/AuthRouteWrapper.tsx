import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks';
import { ROUTES } from '../routes';

const AuthRouteWrapper = () => {
  const {
    store: { authUser },
    isAuthLoading,
  } = useAuth();

  const isUserLoggedIn = !!authUser;

  return isAuthLoading ? null : isUserLoggedIn ? <Navigate to={ROUTES.home} replace /> : <Outlet />;
};

export default observer(AuthRouteWrapper);
