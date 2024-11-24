import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';
import { useAuth } from 'hooks';

const AuthSync = () => {
  const {
    store: { setAuthUser },
  } = useAuth();

  onAuthStateChanged(auth, async (user) => {
    setAuthUser(user);
  });

  return null;
};

export default AuthSync;
