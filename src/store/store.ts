import { modals } from '@mantine/modals';
import { create } from 'zustand';
import type { FormValues } from '../shared/schema';

interface FormStore extends FormValues {
  categories: {
    slug: string;
    name: string;
    category: string;
  }[];
  isLoading: boolean;

  updateData: (data: Partial<FormValues>) => void;
  fetchCategories: () => Promise<void>;
  submitOrder: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  phone: '',
  firstName: '',
  lastName: '',
  gender: '',
  workplace: '',
  address: '',
  amount: 200,
  days: 10,
  categories: [],
  isLoading: false,
};

export const useFormStore = create<FormStore>((set, get) => ({
  ...initialState,

  updateData: (data) => set((state) => ({ ...state, ...data })),

  fetchCategories: async () => {
    if (get().categories.length > 0) return;
    set({ isLoading: true });
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();
      set({ categories: data });
    } finally {
      set({ isLoading: false });
    }
  },

  submitOrder: async () => {
    const { firstName, lastName } = get();
    set({ isLoading: true });
    try {
      await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `${firstName} ${lastName}` }),
      });

      modals.open({
        title: 'Успех',
        children: `Поздравляем, ${get().lastName} ${get().firstName}, Вам одобрена сумма в размере ${get().amount}$ на ${get().days} дней`,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set(initialState),
}));
