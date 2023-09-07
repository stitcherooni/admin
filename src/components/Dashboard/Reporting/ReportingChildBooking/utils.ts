import { SyntheticEvent } from 'react';
import { BookingEventStatFilter, BookingStatEvents, BookingStatGroupByFilter, ChildBookingStatItem } from '../../../../types/reporting/bookings';
import { CellProps } from '../../../shared/Table/TableHead/TableHead';
import { getChildBookingStat, getTestChildBookingStat } from '../../../../redux/actions/reporting.actions';

const convertEventToOptions = (data: BookingEventStatFilter[]) =>
  data.map((item) => ({ value: item.eventId, label: item.eventName }));

export const createEventsOptions = (data: BookingStatEvents[]) => {
  if (!data.length) return [];
  const arr: any = [];

  data.forEach((item) => {
    Object.entries(item.year).forEach((event) => {
      const [label, options] = event;
      arr.push({
        value: label,
        label,
        subMenu: convertEventToOptions(options as any),
      });
    });
  });

  return arr;
};

export const createSortByOptions = (data: BookingStatGroupByFilter[]) => {
  if (!data.length) return [];
  return data.map((item) => ({ value: item.id, label: item.name }));
};

export const handleCloseModal = (e: SyntheticEvent<HTMLDivElement>, cb: () => void) => {
  const target = e.target as HTMLDivElement;

  if (!target.className.length) return;

  if (target.className.includes('overlay')) {
    cb();
  }
};

export const getChildBookingItemsIds = (rowsList: ChildBookingStatItem[]) => {
  return rowsList.map((item) => item.id);
};
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

export const getFetchChildBookingsFn = (showTestBookings: boolean) => {
  return showTestBookings ? getTestChildBookingStat : getChildBookingStat;
};