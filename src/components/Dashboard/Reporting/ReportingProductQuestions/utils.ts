/* eslint-disable arrow-body-style */
import { SyntheticEvent } from 'react';
import {
  ProductQuestionsEventFilter,
  ProductQuestionsEvents,
} from '../../../../types/reporting/productQuestions';
import { BookingStatGroupByFilter, BookingStatProductFilter } from '../../../../types/reporting/bookings';

interface OptionType {
  value: string | number;
  label: string | number;
}

interface EventOptions {
  value: number | string;
  label: number | string;
  subMenu: OptionType[];
}

const convertEventToOptions = (data: ProductQuestionsEventFilter[]) => {
  return data.map((item) => ({ value: item.eventId, label: item.eventName }));
};

export const createEventsOptions = (data: ProductQuestionsEvents[]) => {
  if (!data.length) return [];
  const arr: EventOptions[] = [];

  data.forEach((item) => {
    Object.entries(item.year).forEach((event) => {
      const [label, options] = event;
      arr.push({
        value: label,
        label,
        subMenu: convertEventToOptions(options as unknown as ProductQuestionsEventFilter[]),
      });
    });
  });

  return arr;
};

export const createProductOptions = (data: BookingStatProductFilter[]) => {
  if (!data.length) return [];
  return data.map((item) => ({ value: item.productId, label: item.productName }));
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
