export interface TicketsProps {
  data: TicketItem[];
  qr: string;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filters: TicketsFiltersOptions;
}

export interface TicketItem {
  num: number;
  id: number;
  customerName: string;
  product: string;
  date: string;
  ticketNumber: number;
  contact: string;
  allergies: string[];
}

export interface TicketsEvents {
  year: TicketsEventFilter[];
}

export interface TicketsEventFilter {
  eventId: number;
  eventName: string;
}

export interface TicketsProductFilter {
  productId: number;
  product: string;
}

export interface TicketsFiltersOptions {
  year: TicketsEvents[];
  filters: TicketsProductFilter[];
}
