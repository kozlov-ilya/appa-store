import { zodResolver } from '@hookform/resolvers/zod';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'components/Button';
import FormField from 'components/FormField';
import Text from 'components/Text';
import TextField from 'components/TextField';
import { FORMFIELD_LABELS, INPUT_PLACEHOLDERS } from 'config/consts';
import { useAuth, useOrder } from 'hooks';
import { ROUTES } from 'routes';
import { OrderFormSchema, TOrderForm } from 'store/types';
import styles from './OrderForm.module.scss';

const OrderForm = () => {
  const {
    store: { user },
  } = useAuth();

  const {
    store: { addUserOrder, newOrderProducts },
  } = useOrder();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TOrderForm>({
    resolver: zodResolver(OrderFormSchema),
  });

  useEffect(() => {
    if (user) {
      const defaultFormValues = {
        email: user.email || '',
        name: user.name || '',
        surname: user.surname || '',
        phone: user.phone || '',
      };

      reset(defaultFormValues);
    }
  }, [user, reset]);

  const handleOrderFormSubmit = useCallback(
    async (data: TOrderForm) => {
      const { order, message } = await addUserOrder({ details: data });

      if (!order) {
        return;
      }

      toast.success(message);

      navigate(`${ROUTES.order}/${order.id}`);
    },
    [addUserOrder, navigate],
  );

  return (
    <form className={styles['OrderForm']} onSubmit={handleSubmit(handleOrderFormSubmit)} autoComplete="off">
      <Text view="p-24">Оформление заказа</Text>
      <div className={styles['UserInfo']}>
        <div className={styles['UserInfoSection']}>
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
        </div>
        <div className={styles['UserInfoSection']}>
          <FormField label={FORMFIELD_LABELS.phone} errorMessage={errors.phone?.message}>
            <TextField
              {...register('phone')}
              type="text"
              placeholder={INPUT_PLACEHOLDERS.phone}
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
      </div>
      <div className={styles['Actions']}>
        <Button
          text="Оформить заказ"
          type="submit"
          size="lg"
          stretched
          loading={isSubmitting}
          disabled={!newOrderProducts.length}
        />
      </div>
    </form>
  );
};

export default observer(OrderForm);
