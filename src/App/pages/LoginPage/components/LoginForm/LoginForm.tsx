import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import FormError from 'components/FormError';
import FormField from 'components/FormField';
import Icon from 'components/Icon';
import Link from 'components/Link';
import Text from 'components/Text';
import TextField from 'components/TextField';
import { FORMFIELD_LABELS, INPUT_PLACEHOLDERS } from 'config/consts';
import { useAuth } from 'hooks';
import { ROUTES } from 'routes';
import { LoginFormSchema, TLoginForm } from 'store/types';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {
    store: { loginWithEmail, loginWithGoogle },
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLoginFormSubmit = useCallback(
    async (data: TLoginForm) => {
      setError('');

      const { success, message } = await loginWithEmail(data);

      if (!success) {
        setError(message || '');

        return;
      }

      navigate(ROUTES.home);
    },
    [loginWithEmail, navigate],
  );

  const handleGoogleButtonClick = useCallback(async () => {
    setError('');

    const { success, message } = await loginWithGoogle();

    if (!success) {
      setError(message || '');

      return;
    }
  }, [loginWithGoogle]);

  return (
    <form className={styles['LoginForm']} onSubmit={handleSubmit(handleLoginFormSubmit)}>
      <div className={styles['Fields']}>
        <FormField label={FORMFIELD_LABELS.email} errorMessage={errors.email?.message}>
          <TextField
            {...register('email')}
            type="email"
            placeholder={INPUT_PLACEHOLDERS.email}
            disabled={isSubmitting}
          />
        </FormField>
        <FormField label={FORMFIELD_LABELS.password} errorMessage={errors.password?.message}>
          <TextField
            {...register('password')}
            type="password"
            placeholder={INPUT_PLACEHOLDERS.password}
            disabled={isSubmitting}
            name="password"
            autoComplete="on"
          />
        </FormField>
      </div>
      {error && <FormError className={styles['Error']} text={error} />}
      <div className={styles['Actions']}>
        <Button text="Войти" stretched type="submit" size="lg" loading={isSubmitting} />
        <Button
          className={styles['GoogleButton']}
          type="button"
          size="lg"
          variant="soft"
          leftContent={<Icon icon="Google" />}
          onClick={handleGoogleButtonClick}
          loading={isSubmitting}
        />
      </div>
      <div className={styles['RegisterBlock']}>
        <Text color="secondary">
          Еще нет аккаунта? <Link to={ROUTES.register}>Зарегистрироваться</Link>
        </Text>
      </div>
    </form>
  );
};

export default LoginForm;
