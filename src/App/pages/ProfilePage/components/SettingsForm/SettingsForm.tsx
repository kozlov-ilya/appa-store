import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import FormField from 'components/FormField';
import Loader from 'components/Loader';
import Text from 'components/Text';
import TextField from 'components/TextField';
import { FORMFIELD_LABELS, INPUT_PLACEHOLDERS } from 'config/consts';
import { useAuth } from 'hooks';
import { SettingsFormSchema, TSettingsForm } from 'store/types/settings';
import styles from './SettingsForm.module.scss';

const SettingsForm = () => {
  const {
    store: { user, updateUser },
  } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<TSettingsForm>({
    resolver: zodResolver(SettingsFormSchema),
  });

  useEffect(() => {
    if (user) {
      const defaultFormValues = { name: user.name || '', surname: user.surname || '', phone: user.phone || '' };

      reset(defaultFormValues);
    }
  }, [user, reset]);

  const handleSettingsFormSubmit = useCallback(
    async ({ name, phone, surname }: TSettingsForm) => {
      const data = { name, phone: phone || null, surname: surname || null };

      const { success, message } = await updateUser(data);

      if (success) {
        toast.success(message);
      }
    },
    [updateUser],
  );

  return (
    <form className={styles['SettingsForm']} onSubmit={handleSubmit(handleSettingsFormSubmit)} autoComplete="off">
      <div className={styles['Header']}>
        <Text view="p-24" weight="medium">
          Настройки
        </Text>
        <Button className={styles['SaveButton']} text="Сохранить" loading={isSubmitting} disabled={!isDirty} />
      </div>
      {!user && (
        <div className={styles['LoaderContainer']}>
          <Loader size="lg" />
        </div>
      )}
      {user && (
        <>
          <div className={styles['Fields']}>
            <FormField label={FORMFIELD_LABELS.name} errorMessage={errors.name?.message}>
              <TextField
                {...register('name')}
                type="text"
                placeholder={INPUT_PLACEHOLDERS.name}
                disabled={isSubmitting}
              />
            </FormField>
            <FormField label={FORMFIELD_LABELS.surname} errorMessage={errors.surname?.message}>
              <TextField
                {...register('surname')}
                type="text"
                placeholder={INPUT_PLACEHOLDERS.surname}
                disabled={isSubmitting}
              />
            </FormField>
            <FormField label={FORMFIELD_LABELS.phone} errorMessage={errors.phone?.message}>
              <TextField
                {...register('phone')}
                type="text"
                placeholder={INPUT_PLACEHOLDERS.phone}
                disabled={isSubmitting}
              />
            </FormField>
          </div>
        </>
      )}
    </form>
  );
};

export default observer(SettingsForm);
