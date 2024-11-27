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
import { RegisterFormSchema, TRegisterForm } from 'store/types';
import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const {
    store: { registerWithEmail, loginWithGoogle },
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegisterFormSubmit = useCallback(
    async (data: TRegisterForm) => {
      setError('');

      const { success, message } = await registerWithEmail(data);

      if (!success) {
        setError(message || '');

        return;
      }

      navigate(ROUTES.home);
    },
    [registerWithEmail, navigate],
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
    <form className={styles['RegisterForm']} onSubmit={handleSubmit(handleRegisterFormSubmit)} autoComplete="off">
      <div className={styles['Header']}>
        <Text view="title" weight="medium">
          Добро Пожаловать!
        </Text>
        <Text color="secondary">Зарегистрируйтесь, чтобы получить доступ к оформлению заказов</Text>
      </div>
      <div className={styles['Fields']}>
        <div className={styles['FieldsSection']}>
          <FormField label={FORMFIELD_LABELS.name} errorMessage={errors.name?.message}>
            <TextField
              {...register('name')}
              type="text"
              placeholder={INPUT_PLACEHOLDERS.name}
              disabled={isSubmitting}
            />
          </FormField>
          <FormField label={FORMFIELD_LABELS.email} errorMessage={errors.email?.message}>
            <TextField
              {...register('email')}
              type="email"
              placeholder={INPUT_PLACEHOLDERS.email}
              disabled={isSubmitting}
            />
          </FormField>
        </div>
        <FormField label={FORMFIELD_LABELS.password} errorMessage={errors.password?.message}>
          <TextField
            {...register('password')}
            type="password"
            placeholder={INPUT_PLACEHOLDERS.password}
            disabled={isSubmitting}
          />
        </FormField>
        <FormField label={FORMFIELD_LABELS.confirmPassword} errorMessage={errors.confirmPassword?.message}>
          <TextField
            {...register('confirmPassword')}
            type="password"
            placeholder={INPUT_PLACEHOLDERS.confirmPassword}
            disabled={isSubmitting}
          />
        </FormField>
      </div>
      {error && <FormError text={error} className={styles['Error']} />}
      <div className={styles['Actions']}>
        <Button text="Зарегистрироваться" stretched type="submit" size="lg" loading={isSubmitting} />
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
          Уже есть аккаунта? <Link to={ROUTES.login}>Войти</Link>
        </Text>
      </div>
    </form>
  );
};

export default RegisterForm;
