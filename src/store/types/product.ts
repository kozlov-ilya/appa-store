import { CATEGORY_NAMES } from 'config/consts';

export type TCategory = (typeof CATEGORY_NAMES)[number];

export type TNamedCategory = { category: TCategory; name: string };

export type TProductApi = {
  id: string;
  name: string;
  category: TCategory;
  brand: string;
  description: string;
  price: number;
  imgUrls: string[];
  searchIndex: string[];
};

export type TProduct = {
  id: string;
  name: string;
  category: TCategory;
  brand: string;
  description: string;
  price: number;
  imgUrls: string[];
};

export const normalizeProduct = (product: TProductApi): TProduct => {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand,
    description: product.description,
    price: product.price,
    imgUrls: product.imgUrls,
  };
};

export type TProductsQueryParams = {
  category: string | null;
  term: string | null;
};

export type TProductsQueryParamsKeys = keyof TProductsQueryParams;

export const isCategory = (category: unknown) => {
  return Boolean(typeof category === 'string' && CATEGORY_NAMES.find((c) => c === category));
};
