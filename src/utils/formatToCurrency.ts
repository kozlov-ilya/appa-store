export const formatToCurrency = (value: number) => {
  return Intl.NumberFormat('Ru-ru', { style: 'currency', currency: 'RUB' }).format(value).slice(0, -2);
};
