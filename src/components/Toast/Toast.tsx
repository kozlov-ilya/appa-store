import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';

const Toast = () => {
  const { theme } = useTheme();

  return <ToastContainer position="bottom-right" theme={theme} autoClose={3000} hideProgressBar />;
};

export default Toast;
