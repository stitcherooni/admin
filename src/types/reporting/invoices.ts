export interface InvoicesStatProps {
  data: InvoiceStatItem[];
}

export interface InvoiceStatItem {
  invoiceNo: number;
  num: number;
  id: number;
  issueDate: string;
  dueDate: string;
  status: string;
  net: number;
  vat: number;
  total: number;
  currency: string;
  invoice: string;
}
