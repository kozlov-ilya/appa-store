import { z } from 'zod';
import { phoneValidation } from './order';

export const SettingsFormSchema = z.object({
  name: z.string().min(1, { message: 'Имя является обязательным полем!' }),
  surname: z.string().optional(),
  phone: z.string().regex(phoneValidation, { message: 'Неправильный формат телефона!' }).optional().or(z.literal('')),
});

export type TSettingsForm = z.infer<typeof SettingsFormSchema>;
