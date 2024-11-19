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

export const ROUTES = {
  home: '/',
  product: '/product/',
  search: '/search',
  cart: '/cart',
  newOrder: '/order',
} as const;

export const FIRESTORE_COLLECTIONS = {
  products: 'products',
} as const;
