import { Price } from '.';
import { Order } from './orders';

export interface BankedProps {
  data: BankedItem[];
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
  num: number;
  orderId: number;
  status: string;
  date: string;
  value: number;
  bankedFee: number;
  platformFee: number;
  order: Order;
}
