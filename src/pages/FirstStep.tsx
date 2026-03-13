import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, Stack, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { formSchema } from '../shared/schema';
import { useFormStore } from '../store/store';

export const FirstStepPage = () => {
  const store = useFormStore();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(
      formSchema.pick({ phone: true, firstName: true, lastName: true, gender: true })
    ),
    defaultValues: store,
  });

  const onSubmit = (data: any) => {
    store.updateData(data);
    navigate('/step2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack maw={400} mx='auto' mt='xl'>
        <Controller
          render={({ field }) => (
            <PatternFormat
              format='+7 -###-###-##-##'
              value={field.value}
              allowEmptyFormatting
              label='Номер телефона'
              placeholder='+7 (___) ___-__-__'
              customInput={TextInput}
              onValueChange={(values) => {
                field.onChange(String(values.floatValue));
              }}
              error={errors.phone?.message as any}
            />
          )}
          name='phone'
          control={control}
        />
        <Controller
          name='firstName'
          control={control}
          render={({ field }) => (
            <TextInput {...field} label='Имя' error={errors.firstName?.message} />
          )}
        />
        <Controller
          name='lastName'
          control={control}
          render={({ field }) => (
            <TextInput {...field} label='Фамилия' error={errors.lastName?.message} />
          )}
        />
        <Controller
          name='gender'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label='Пол'
              data={['Мужской', 'Женский']}
              error={errors.gender?.message}
            />
          )}
        />
        <Button type='submit'>Далее</Button>
      </Stack>
    </form>
  );
};
