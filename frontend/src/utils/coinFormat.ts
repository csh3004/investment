export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

export const getChangeClass = (change: number) => {
  return change >= 0 ? 'text-red-500' : 'text-blue-500';
};