export interface SalesFiltersProps {
  events: SalesEvents;
}

export interface SalesProps {
  data: SalesDataProps;
  totalSales: number;
  avgSalesValue: number;
  totalSalesValue: number;
  platformBookingFees: number;
  currency: string;
  filters: SalesFiltersProps;
}

export interface SalesDataProps {
  totalSales: TotalSales;
  totalSoldByDay: TotalSoldByDay;
  productsSoldByDay: {
    [productName: string]: ProductsSoldByDayItem;
  };
  productsSoldBySchool: {
    [productName: string]: ProductSoldSchool;
  };
  productOrderCount: {
    [productName: string]: ProductOrderCount;
  };
}

export interface SalesEvents {
  [year: number]: SalesEventFilter[];
}

export interface SalesEventFilter {
  eventId: number;
  eventName: string;
}

export interface TotalSales {
  productPercentage: {
    [productName: string]: number;
  };
  sales: TotalSalesItem[];
  totalQuantity: number;
  totalSold: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface TotalSalesItem {
  num: number;
  product: string;
  quantity: number;
  targetQuantity: number;
  difference: number;
  attaintment: number;
  totalSales: number;
}

export interface TotalSoldByDay {
  data: TotalSoldByDayItem[];
  totalQuantity: number;
  totalQuantityToDate: number;
  totalSales: number;
  totalSalesToDate: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface TotalSoldByDayItem {
  num: number;
  date: string;
  percentage: number;
  quantity: number;
  quantityToDate: number;
  totalSales: number;
  toDate: number;
}

export interface ProductsSoldByDayItem {
  data: SoldByDayProduct[];
  totalPercentage: number;
  totalQuantity: number;
  totalQuantityToDate: number;
  totalSales: number;
  totalToDate: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface SoldByDayProduct {
  num: number;
  date: string;
  percentage: number;
  quantity: number;
  quantityToDate: number;
  totalSales: number;
  toDate: number;
}

export interface ProductSoldSchool {
  data: ProductSoldSchoolItem[];
  totalPercentage: number;
  totalQuantity: number;
  totalSales: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductSoldSchoolItem {
  num: number;
  schoolName: string;
  percentage: number;
  quantity: number;
  totalSales: number;
}

export interface ProductOrderCount {
  data: ProductOrderCountItem[];
  totalPercentage: number;
  totalOrders: number;
  totalProductCount: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductOrderCountItem {
  percentage: number;
  noOfOrder: number;
  productCount: number;
}
