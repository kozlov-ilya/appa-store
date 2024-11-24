import { TNamedCategory } from 'store/types';

export const BREAKPOINTS = { xs: 520, sm: 768, md: 1024, lg: 1280, xl: 1640 } as const;

export const PRODUCT_IMAGES_BASE_PATH = '/images/products';

export const CATEGORY_NAMES = ['jackets', 'tshirts', 'bottoms', 'footwear', 'accesories'] as const;

export const NAMED_CATEGORIES: TNamedCategory[] = [
  { name: 'Куртки', category: 'jackets' },
  { name: 'Футболки', category: 'tshirts' },
  { name: 'Брюки', category: 'bottoms' },
  { name: 'Обувь', category: 'footwear' },
  { name: 'Аксесуары', category: 'accesories' },
] as const;

export const DEFAULT_CATEGORY: TNamedCategory = { name: 'Куртки', category: 'jackets' } as const;

export const FIRESTORE_COLLECTIONS = {
  products: 'products',
  users: 'users',
  orders: 'orders',
} as const;

export const LOCAL_STORAGE_ITEMS = {
  cart: 'cart',
  order: 'order',
};

export const FORMFIELD_LABELS = {
  name: 'Имя',
  surname: 'Фамилия',
  email: 'Email',
  password: 'Пароль',
  confirmPassword: 'Подтверждение пароля',
  phone: 'Номер телефона',
};

export const INPUT_PLACEHOLDERS = {
  name: 'Введите своё имя',
  surname: 'Введите свою фамилию',
  email: 'Введите свой Email',
  password: 'Введите пароль',
  confirmPassword: 'Введите пароль еще раз',
  phone: 'Введите свой номер телефона',
};

export const productNumCases = ['товар', 'товара', 'товаров'];

export const foundNumCases = ['доступен', 'доступно', 'доступно'];

export const NAMED_ORDER_FIELDS: Record<string, string> = {
  name: 'Имя',
  email: 'Email',
  phone: 'Телефон',
  surname: 'Фамилия',
  date: 'Дата заказа',
} as const;

export const cartLimit = 30;

export const cartLimitErrorMessage = 'Нельзя добавить в корзину больше 30 элементов';
