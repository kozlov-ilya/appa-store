import { z } from 'zod';
import { TCountedProduct } from './product';

export type TOrderProducts = TCountedProduct[];

export const phoneValidation = new RegExp(/(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/);

export const OrderFormSchema = z.object({
  name: z.string().min(1, { message: 'Имя является обязательным полем!' }),
  surname: z.string().min(1, { message: 'Фамилия является обязательным полем!' }),
  phone: z
    .string()
    .min(1, { message: 'Телефон является обязательным полем!' })
    .regex(phoneValidation, { message: 'Неправильный формат телефона!' }),
  email: z
    .string()
    .min(1, { message: 'Email является обязательным полем!' })
    .email({ message: 'Неправильный формат email!' }),
});

export type TOrderForm = z.infer<typeof OrderFormSchema>;

export type TOrderDetails = TOrderForm;

export type TOrderId = string;

export type TOrder = { id: TOrderId; date: Date; products: TOrderProducts; details: TOrderDetails };

export type TOrderResponse = { order: TOrder | null; message?: string };

export const OrderSuccessMessages = {
  add: 'Заказ успешно оформлен!',
} as const;

export const OrderErrorMessages = {
  add: 'Не получилось оформить заказ!',
} as const;
