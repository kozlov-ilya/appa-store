import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes';

const NotFoundPage = () => {
  return <Navigate to={ROUTES.home} replace />;
};

export default NotFoundPage;
