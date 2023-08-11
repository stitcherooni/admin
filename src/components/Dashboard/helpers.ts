export const addCurrencyToStatistic = (stat: Record<string, string | number>, currency: string) => {
  let newStat = { ...stat };
  const needsCurrency = ['sales', 'avgOrderValue'];
  Object.entries(stat).forEach((item) => {
    const [name, value] = item;
    if (needsCurrency.includes(name)) {
      newStat = { ...newStat, [name]: `${currency}${value}` };
    }
  });

  return newStat;
};
