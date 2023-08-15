export const getCurrencyByCode = (currencyCode: string) => {
  switch (currencyCode) {
    case 'GBP': return '£';
    default: return '£';
  }
};

// eslint-disable-next-line arrow-body-style
export const sumTotalAmount = (arr: number[]) => {
  return arr.reduce((acc, amount) => acc + amount * 100, 0) / 100;
};
