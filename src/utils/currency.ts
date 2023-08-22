export const getCurrencyByCode = (currencyCode: string, amount: number = 0) => {
  switch (currencyCode) {
    case 'GBP': return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount);
    case 'USD': return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
    default: return null;
  }
};

// eslint-disable-next-line arrow-body-style
export const sumTotalAmount = (arr: number[]) => {
  return arr.reduce((acc, amount) => acc + amount * 100, 0) / 100;
};
