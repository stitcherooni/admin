import { Price } from '.';
import { Order } from './orders';

export interface BankedProps {
  data: BankedItem[];
  testTransactions: BankedItem[];
  totalOrdersCount: number;
  totalSalesAmount: Price;
  totalBankedFee: Price;
  totalPlatformFees: Price;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface BankedItem {
  id: number;
  num: number;
  orderId: number;
  status: string;
  date: string;
  value: number;
  bankedFee: number;
  platformFee: number;
  order: Order;
}