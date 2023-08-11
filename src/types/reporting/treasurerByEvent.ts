export interface TreasurerByEventProps {
  data: TreasurerByEventItem[];
  totalSales: number;
  profit: number;
  processingFeeNotPaid: number;
  platformFeesNotPaid: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filters: TreasurerByEventFilters;
}

export interface TreasurerByEventItem {
  num: number;
  id: number;
  customerName: string;
  product: string;
  date: string;
  address: string;
  type: string;
  transactionId: number;
  transactionEmail: string;
  email: string;
  toDate: string;
  quantity: number;
  price: number;
  currency: string;
  gitfAid: number;
  refunded: number;
  feesNotPaid: number;
  feePaid: number;
  platformFeesNotPaid: number;
  platformFeePaid: number;
}

export interface TreasurerByEventFilters {
  year: TreasurerByEventEventFilter;
  paymentTypes: TreasurerByEventPaymentType[];
}

export interface TreasurerByEventEventFilter {
  [year: number]: TreasurerByEventEvent;
}

export interface TreasurerByEventEvent {
  eventId: number;
  eventName: string;
}

export interface TreasurerByEventPaymentType {
  paymentTypeId: string;
  paymentTypeName: string;
}
