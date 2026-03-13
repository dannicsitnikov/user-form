import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Select, Stack, TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { formSchema } from '../shared/schema';
import { useFormStore } from '../store/store';

export const SecondStepPage = () => {
  const store = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.fetchCategories();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema.pick({ workplace: true, address: true })),
    defaultValues: store,
  });

  const onSubmit = (data: any) => {
    store.updateData(data);
    navigate('/step3');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack maw={400} mx='auto' mt='xl'>
        <Controller
          name='workplace'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label='Место работы'
              data={store.categories.map((cat) => ({
                label: cat.name,
                value: cat.name,
              }))}
              // loa={store.isLoading}
              error={errors.workplace?.message}
              searchable
            />
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Адрес проживания'
              error={errors.address?.message}
            />
          )}
        />
        <Button variant='outline' onClick={() => navigate(-1)} className='w-full'>
          Назад
        </Button>
        <Button type='submit' className='w-full'>
          Далее
        </Button>
      </Stack>
    </form>
  );
};
