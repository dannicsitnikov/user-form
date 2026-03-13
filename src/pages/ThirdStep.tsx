import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Slider, Stack, Text } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { formSchema } from '../shared/schema';
import { useFormStore } from '../store/store';

export const ThirdStepPage = () => {
  const store = useFormStore();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema.pick({ amount: true, days: true })),
    defaultValues: store,
  });

  const onSubmit = async (data: any) => {
    store.updateData(data);
    await store.submitOrder();
  };

  return (
    <Box pos='relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack maw={400} mx='auto' mt='xl'>
          <Controller
            name='amount'
            control={control}
            render={({ field }) => (
              <>
                <Text size='sm'>Сумма: ${field.value}</Text>
                <Slider {...field} min={200} max={10000} step={100} label={null} />
              </>
            )}
          />
          <Controller
            name='days'
            control={control}
            render={({ field }) => (
              <>
                <Text size='sm'>Срок: {field.value} дней</Text>
                <Slider {...field} min={10} max={30} step={1} label={null} />
              </>
            )}
          />
          <Button variant='outline' onClick={() => navigate(-1)} className='w-full'>
            Назад
          </Button>
          <Button type='submit' color='green' className='w-full'>
            Подать заявку
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
