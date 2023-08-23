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

export enum OrderStatus {
  OrderDispatched = 'Dispatched',
  OrderCompleted = 'Completed',
  OrderDeleted = 'Deleted',
  OrderReserved = 'Reserved',
  OrderTest = 'Test',
  OrderFailed = 'Failed',
  OrderAwaitingDispatch = 'Awaiting dispatch',
  OrderPartialRefund = 'Partial refund',
  OrderRefunded = 'Refunded',
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
  history: OrderHistory;
}

interface OrderHistory {
  data: OrderHistoryItem[];
  refundedQuantity: number;
  refundedPrice: number;
  refundedLineAmount: number;
}

export interface OrderHistoryItem {
  productId: number;
  productName: string;
  quantity: number;
  price: Price;
  lineAmount: Price;
  status: keyof typeof OrderStatus;
}
