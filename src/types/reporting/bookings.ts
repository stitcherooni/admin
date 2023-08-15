export interface BookingsStatProps {
  data: BookingStatItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filters: BookingStatFilters | null;
}

export interface BookingStatItem {
  num: number;
  id: number;
  product: string;
  customerName: string;
  bookingName: string;
  date: string;
  contact: string;
  allergies: string[];
}

export interface BookingStatFilters {
  events: BookingStatEvents[];
  products: BookingStatProductFilter[];
  groupBy: BookingStatGroupByFilter;
}

export interface BookingStatEvents {
  year: BookingEventStatFilter[];
}
export interface BookingEventStatFilter {
  eventId: number;
  eventName: string;
}

export interface BookingStatProductFilter {
  productId: number;
  productName: string;
}

export interface BookingStatGroupByFilter {
  id: string;
  name: string;
}

export interface ChildOnlyBookingsStatProps {
  data: ChildBookingStatItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filters: ChildBookingFilters | null;
}

export interface ChildBookingStatItem {
  num: number;
  id: number;
  firstName: string;
  lastName: string;
  bookedBy: string;
  allergies: string[];
  phone: number;
  soldQuantity: number;
}

export interface ChildBookingFilters {
  events: BookingStatEvents[];
  groupBy: BookingStatGroupByFilter;
}
