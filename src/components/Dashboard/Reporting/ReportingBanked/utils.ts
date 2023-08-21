import dayjs from 'dayjs';
import { BankedItem } from '../../../../types/reporting/banked';
import { getCurrencyByCode } from '../../../../utils/currency';
import { CellProps } from '../../../shared/Table/TableHead/TableHead';

export const convertBankedItems = (items: BankedItem[], currency: string = 'GBP') => items.map((item) => ({
  ...item,
  date: dayjs(item.date).format('DD/MM/YYYY HH:mm'),
  value: `${getCurrencyByCode(currency)}${item.value}`,
  bankedFee: `${getCurrencyByCode(currency)}${item.bankedFee}`,
  platformFee: `${getCurrencyByCode(currency)}${item.platformFee}`,
}));

export const getBankedItemsIds = (rowsList: BankedItem[]) => rowsList.map((item) => item.id);
export const getAvailableColumns = (cols: CellProps[]) => cols.map((col) => col.id);
export const getSortingOrdering = (
  data: { orders: string[], fields: string[] },
  columns: CellProps[],
) => {
  const { fields, orders } = data;
  const res = [] as Record<string, string>[];
  if (!fields.length && !orders.length) {
    columns.forEach((item) => {
      res.push({ [item.id]: 'asc' });
    });
  } else {
    fields.forEach((item, i) => {
      res.push({ [item]: orders[i] });
    });
  }

  return res;
};
