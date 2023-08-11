import { Price } from '.';

export interface CustomersStatProps {
  data: CustomerStatItem[];
  totalOrdersNumber: number;
  totalOrderValue: Price;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface CustomerStatItem {
  num: number;
  id: number;
  firstName: string;
  lastName: string;
  child: string;
  date: string;
  orders: number;
  value: Price;
}
