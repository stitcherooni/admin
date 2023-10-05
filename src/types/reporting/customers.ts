export interface CustomersStatProps {
  data: CustomerStatItem[];
  totalOrdersNumber: number;
  totalOrderValue: number;
  customersCount: number;
  currency: string;
}

export interface CustomerStatItem {
  num: number;
  id: number;
  firstName: string;
  lastName: string;
  child: string;
  date: string;
  orders: number;
  value: number;
  approved: boolean;
}
