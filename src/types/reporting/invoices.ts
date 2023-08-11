export interface InvoicesStatProps {
  data: InvoiceStatItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface InvoiceStatItem {
  num: number;
  id: number;
  issureDate: string;
  dueDate: string;
  status: string;
  net: number;
  vat: number;
  total: number;
  currency: string;
  invoice: string;
}
