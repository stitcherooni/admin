import { SyntheticEvent, useState } from 'react';
import {
  BookingEvents, BookingGroupByFilter, BookingProductFilter, EventFilter,
} from '../../../../types/reporting/bookings';

const convertEventToOptions = (data: EventFilter[]) => data.map((item) => ({ value: item.eventId, label: item.eventName }));

export const createEventsOptions = (data: BookingEvents[]) => {
  if (!data.length) return [];
  const arr = [];

  data.forEach((item) => {
    Object.entries(item.year).forEach((event) => {
      const [label, options] = event;
      arr.push({
        value: label,
        label,
        subMenu: convertEventToOptions(options),
      });
    });
  });

  return arr;
};

export const createProductOptions = (data: BookingProductFilter[]) => {
  if (!data.length) return [];
  return data.map((item) => ({ value: item.productId, label: item.productName }));
};

export const createSortByOptions = (data: BookingGroupByFilter[]) => {
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
