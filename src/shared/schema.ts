import { z } from 'zod';

export const formSchema = z.object({
  phone: z.string('Обязательно').length(10, 'Не верный формат'),
  firstName: z.string('Обязательно').min(2, 'Минимум 2 символа'),
  lastName: z.string('Обязательно').min(2, 'Минимум 2 символа'),
  gender: z.string('Обязательно').min(1, 'Выберите пол'),
  workplace: z.string().min(1, 'Выберите место работы').optional(),
  address: z.string('Обязательно').min(5, 'Введите адрес'),
  amount: z.number().min(200).max(1000),
  days: z.number().min(10).max(30),
});

export type FormValues = z.infer<typeof formSchema>;
