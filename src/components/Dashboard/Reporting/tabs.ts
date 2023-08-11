export enum ReportTypes {
  MI_WIZARD = 'mi_wizard',
  BANKED = 'banked',
  BOOKINGS = 'bookings',
  CHILD_BOOKINGS = 'child_only_bookings',
  CUSTOMERS = 'customers',
  EMAIL_TRACKER = 'email_tracker',
  INVOICES = 'invoices',
  ORDERS = 'orders',
  PRODUCT_QUESTIONS = 'product_questionhorizontal',
  SALES = 'sales',
  TICKETS = 'tickets',
  TREASURER_BY_EVENT = 'treasurer_by_event',
  TREASURER_BY_DATE = 'treasurer_by_date',
  VOLUNTEERS = 'volunteers',
}

export const tabsList = [
  // {
  //   value: ReportTypes.MI_WIZARD,
  //   label: 'Mi Wizard',
  // },
  {
    value: ReportTypes.BANKED,
    label: 'Banked',
  },
  {
    value: ReportTypes.BOOKINGS,
    label: 'Bookings',
  },
  {
    value: ReportTypes.CHILD_BOOKINGS,
    label: 'Child only bookings',
  },
  {
    value: ReportTypes.CUSTOMERS,
    label: 'Customers',
  },
  {
    value: ReportTypes.EMAIL_TRACKER,
    label: 'Email tracker',
  },
  {
    value: ReportTypes.INVOICES,
    label: 'Invoices',
  },
  {
    value: ReportTypes.ORDERS,
    label: 'Orders',
  },
  {
    value: ReportTypes.PRODUCT_QUESTIONS,
    label: 'Product Questions',
  },
  {
    value: ReportTypes.SALES,
    label: 'Sales',
  },
  {
    value: ReportTypes.TICKETS,
    label: 'Tickets',
  },
  {
    value: ReportTypes.TREASURER_BY_EVENT,
    label: 'Treasurer by event',
  },
  {
    value: ReportTypes.TREASURER_BY_DATE,
    label: 'Treasurer by date',
  },
  {
    value: ReportTypes.VOLUNTEERS,
    label: 'Volunteers',
  },
];
