import { SyntheticEvent } from 'react';
import {
  TicketsEventFilter,
  TicketsEvents,
  TicketsProductFilter,
} from '../../../../types/reporting/tickets';

const convertEventToOptions = (data: TicketsEventFilter[]) =>
  data.map((item) => ({ value: item.eventId, label: item.eventName }));

export const createEventsOptions = (data: TicketsEvents[]) => {
  if (!Object.values(data).length) return [];
  const arr: any = [];

  Object.entries(data).forEach((event) => {
    const [label, options] = event;
    arr.push({
      value: label,
      label,
      subMenu: convertEventToOptions(options as any),
    });
  });

  return arr;
};

export const createSortByOptions = (data: TicketsProductFilter[]) => {
  if (!data.length) return [];
  return data.map((item) => ({ value: item.productId, label: item.product }));
};

export const handleCloseModal = (e: SyntheticEvent<HTMLDivElement>, cb: () => void) => {
  const target = e.target as HTMLDivElement;

  if (!target.className.length) return;

  if (target.className.includes('overlay')) {
    cb();
  }
};
