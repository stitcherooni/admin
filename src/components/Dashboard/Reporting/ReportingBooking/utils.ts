/* eslint-disable max-len */
import { SyntheticEvent } from 'react';
import dayjs from 'dayjs';
import {
  BookingEventStatFilter,
  BookingStatEvents,
  BookingStatGroupByFilter,
  BookingStatItem,
  BookingStatProductFilter,
} from '../../../../types/reporting/bookings';
import { getCurrencyByCode } from '../../../../utils/currency';
import { CellProps } from '../../../shared/Table/TableHead/TableHead';
import { getBookingStat, getTestBookingStat } from '../../../../redux/actions/reporting.actions';
import { menuActionsOptions } from './table-data';
import { downloadFile } from '../../../../utils/file';
import { copyTable } from '../../../shared/Table/utils';
import { ConvertedBooking } from './ReportingBooking';
import { SortingTableData } from '../../../shared/Table/types';

const convertEventToOptions = (data: BookingEventStatFilter[]) => data.map((item) => ({ value: item.eventId, label: item.eventName }));

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

export const createProductOptions = (data: BookingStatProductFilter[]) => {
  if (!data.length) return [];
  return data.map((item) => ({ value: item.productId, label: item.productName }));
};

export const createSortByOptions = (data: BookingStatGroupByFilter[]) => {
  if (!data.length) return [];
  return data.map((item) => ({ value: item.id, label: item.name }));
};

export const convertBookingItems = (items: BookingStatItem[], currency: string = 'GBP') => items.map((item) => ({
  ...item,
  date: dayjs(item.date).format('DD/MM/YYYY HH:mm'),
  price: `${getCurrencyByCode(currency, item.price)}`,
}));

export const getBookingItemsIds = (rowsList: BookingStatItem[]) => rowsList.map((item) => item.id);

export const getAvailableColumns = (cols: CellProps[]) => cols.map((col) => col.id);

export const getSortingOrdering = (
  data: { orders: string[]; fields: string[] },
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

export const getFetchBookingsFn = (showTestBookings: boolean) => (showTestBookings ? getTestBookingStat : getBookingStat);

interface DownloadFileParams {
  fileName: string;
  url: string;
  tableData: SortingTableData<BookingStatItem>;
  errorCb: (error: null | string) => void;
  headCells: CellProps[];
}

export const downloadBookingFile = ({
  url,
  fileName,
  tableData,
  errorCb,
  headCells,
}: DownloadFileParams) => downloadFile(
  url,
  fileName,
  {
    ids: getBookingItemsIds(tableData.visibleRows),
    columns: getAvailableColumns(tableData.customization.visibleColumns),
    ordering: getSortingOrdering(tableData.sorting.filters, headCells), // objects, key - field name, value - asc | desc
  },
  errorCb,
);

interface CreateBookingActions {
  handleCustomize: (flag: boolean) => void;
  tableData: SortingTableData<BookingStatItem>;
  headCells: CellProps[];
  errorCb: (error: null | string) => void;
  showTestBookings: boolean;
  fetchBookingData: (testBookings: boolean) => void;
  tableRef: React.RefObject<HTMLTableElement | null>;
  toggleShowRandom: () => void;
  sendNewsletter: () => void;
}

const createBookingsCopyData = (data: ConvertedBooking[]) => {
  const rows: Array<string[]> = [];
  data.forEach((item) => {
    rows.push([
      item.num,
      item.firstName,
      item.lastName,
      item.bookingName,
      item.class,
      item.bookingInfo,
      item.sku,
      item.product.name,
      item.price,
      item.quantity,
      item.orderId,
      item.date,
      item.customerName,
      // item.phone,
      // item.email,
      // item.paymentMethod,
    ]);
  });
  return rows;
};

export const createBookingActions = (data: CreateBookingActions) => {
  const {
    handleCustomize,
    tableData,
    headCells,
    errorCb,
    showTestBookings,
    fetchBookingData,
    toggleShowRandom,
    sendNewsletter,
  } = data;

  const {
    search, visibleRows, allRows, customization,
  } = tableData;

  const rows = search.isSearching ? visibleRows : allRows;

  return menuActionsOptions
    .map((item) => {
      switch (item.value) {
        case 'customize-view':
          return { ...item, handleClick: () => handleCustomize(true) };
        case 'excel':
          return {
            ...item,
            handleClick: () => downloadBookingFile({
              url: '/Report/bookingsexcel',
              fileName: 'excel.xls',
              tableData,
              errorCb,
              headCells,
            }),
          };
        case 'pdf':
          return {
            ...item,
            handleClick: () => downloadBookingFile({
              url: '/Report/bookingspdf?format=table',
              fileName: 'report.pdf',
              tableData,
              errorCb,
              headCells,
            }),
          };
        case 'pdf-customize-view':
          return {
            ...item,
            handleClick: () => downloadBookingFile({
              url: '/Report/bookingspdf?format=doorValidation',
              fileName: 'report.pdf',
              tableData,
              errorCb,
              headCells,
            }),
          };
        case 'test-bookings':
          return !showTestBookings
            ? {
              ...item,
              handleClick: () => fetchBookingData(true),
            }
            : null;
        case 'live-bookings':
          return showTestBookings
            ? {
              ...item,
              handleClick: () => fetchBookingData(false),
            }
            : null;
        case 'copy': {
          return {
            ...item,
            handleClick: () => copyTable(
              createBookingsCopyData(rows),
              customization.visibleColumns,
            ),
          };
        }
        case 'random': {
          return {
            ...item,
            handleClick: () => toggleShowRandom(),
          };
        }

        case 'email': {
          return {
            ...item,
            handleClick: () => sendNewsletter(),
          };
        }

        default:
          return item;
      }
    })
    .filter((item) => item);
};
