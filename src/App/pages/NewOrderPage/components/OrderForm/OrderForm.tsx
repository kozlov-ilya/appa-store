import { observer } from 'mobx-react-lite';
import { FormEventHandler, useCallback } from 'react';
import FormField from 'components/FormField';
import TextField from 'components/TextField';
import { useOrder } from 'hooks';
import styles from './OrderForm.module.scss';

const OrderForm = () => {
  const {
    store: { name, email, submitOrder },
    handleNameChange,
    handleEmailChange,
  } = useOrder();

  const handleFormSubmit: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();

      submitOrder();
    },
    [submitOrder],
  );

  return (
    <form className={styles['OrderForm']} onSubmit={handleFormSubmit}>
      <div className={styles['UserInfo']}>
        <FormField label="Имя" isRequired errorMessage={name.error}>
          <TextField value={name.value} onChange={handleNameChange} radius="md" placeholder="Введите свое имя" />
        </FormField>
        <FormField label="Email" isRequired errorMessage={email.error}>
          <TextField
            value={email.value}
            onChange={handleEmailChange}
            radius="md"
            placeholder="Введите свой почтовый адрес"
          />
        </FormField>
      </div>
    </form>
  );
};

export default observer(OrderForm);
