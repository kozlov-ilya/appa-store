import { AuthErrorCodes } from 'firebase/auth';
import { z } from 'zod';
import { TOrderId } from './order';

export type TUser = {
  uid: string;
  email: string | null;
  name: string | null;
  surname: string | null;
  phone: string | null;
  orders: TOrderId[];
};

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email является обязательным полем!' })
    .email({ message: 'Неправильный формат email!' }),
  password: z.string().min(1, { message: 'Пароль является обязательным полем!' }),
});

export type TLoginForm = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Имя является обязательным полем!' }),
    email: z
      .string()
      .min(1, { message: 'Email является обязательным полем!' })
      .email({ message: 'Неправильный формат email!' }),
    password: z.string().min(1, { message: 'Пароль является обязательным полем!' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают!',
    path: ['confirmPassword'],
  });

export type TRegisterForm = z.infer<typeof RegisterFormSchema>;

export type TAuthResponse = { success: boolean; message?: string };

export const AuthSuccessMessages = {
  updateUser: 'Данные обновлены!',
} as const;

export const AuthErrorMessages: Record<string, string> = {
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: 'Неверный Email или пароль!',
  [AuthErrorCodes.WEAK_PASSWORD]: 'Слишком простой пароль!',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Email уже зарегистрирован!',
  internal: 'Внутренняя ошибка!',
  updateUser: 'Ошибка при обновлении данных!',
} as const;
