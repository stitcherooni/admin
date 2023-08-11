export interface TreasurerByDateProps {
  data: TreasurerByDateItem[];
  totalSales: number;
  profit: number;
  processingFeeNotPaid: number;
  platformFeesNotPaid: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface TreasurerByDateItem {
  num: number;
  id: number;
  customerName: string;
  product: string;
  date: string;
  event: string;
  type: any;
  paypalId: number;
  paypaEmail: string;
  quantity: number;
  price: number;
  giftAid: number;
  refunded: number;
  cost: number;
}
