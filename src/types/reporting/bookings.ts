import { Order } from './orders';

export interface BookingsStatProps {
  data: BookingStatItem[];
  totalProductQuantity: number;
  filters: BookingStatFilters | null;
}

export interface BookingStatItem {
  num: number;
  firstName: string;
  lastName: string;
  class: string;
  bookingInfo: string;
  sku: number;
  currency?: string;
  price: number;
  quantity: string;
  orderId: number;
  customerName: string;
  bookingName: string;
  paymentMethod: string;
  phone: string;
  order: Order;
  email: string;
  bookingsId: number[];
  id: number;
  product: BookingProduct;
  date: string;
  allergies: string[];
}

interface BookingProduct {
  id: number;
  name: string;
  bookable: number;
  productHideClass: boolean;
  quantityInStock: number;
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
