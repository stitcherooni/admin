import { Price } from '.';

export interface OrdersStatProps {
  data: Order[];
  totalSalesAmount: Price;
  totalProcessingFees: Price;
  totalPlatformFees: Price;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface Order {
  num: number;
  id: number;
  customerName: string;
  customerId: number;
  status: string;
  date: string;
  orders: number;
  value: Price;
  schoolName: string;
  email: string;
  transactionId: string;
  payerEmail: string;
  paymentMethod: any;
  type: string;
  platformFee: number;
  refunded: number;
  history: OrderHistoryItem[];
}

export interface OrderHistoryItem {
  productId: number;
  productName: string;
  quantity: number;
  price: Price;
  lineAmount: Price;
  status: string;
}
