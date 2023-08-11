/* eslint-disable arrow-body-style */
import { SyntheticEvent } from 'react';
import { SalesEventFilter } from '../../../../types/reporting/sales';

interface OptionType {
  value: string | number;
  label: string | number;
}

interface EventOptions {
  value: number | string;
  label: number | string;
  subMenu: OptionType[];
}

const convertEventToOptions = (data: SalesEventFilter[]) => {
  return data.map((item) => ({ value: item.eventId, label: item.eventName }));
};

export const createEventsOptions = (data: any) => {
  if (!data?.year) return [];
  const arr: EventOptions[] = [];

  Object.entries(data.year).forEach((event) => {
    const [label, options] = event;
    arr.push({
      value: label,
      label,
      subMenu: convertEventToOptions(options as unknown as SalesEventFilter[]),
    });
  });

  return arr;
};

export const handleCloseModal = (e: SyntheticEvent<HTMLDivElement>, cb: () => void) => {
  const target = e.target as HTMLDivElement;

  if (!target.className.length) return;

  if (target.className.includes('overlay')) {
    cb();
  }
};
