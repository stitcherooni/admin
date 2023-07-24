import React from 'react';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import { ContentCopyOutlined, TuneOutlined } from '@mui/icons-material';
import ListEditIcon from '../../../../assets/icons/list-edit-icon';
import DeleteIcon from '../../../../assets/icons/delete-icon';
import { theme } from '../../../../styles/defaultTheme';
import MessageIcon from '../../../../assets/icons/message-icon';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';

export const headCells = [
  {
    id: 'row-id',
    label: '##',
    className: 'row-id',
  },
  {
    id: 'first-name',
    label: 'First Name',
    className: 'first-name',
  },
  {
    id: 'last-name',
    label: 'Last Name',
    className: 'last-name',
  },
  {
    id: 'bookingName',
    label: 'Booking Name (as entered)',
    className: 'booking-name',
  },
  {
    id: 'class',
    label: 'Class',
    className: 'class',
  },
  {
    id: 'bookingInfo',
    label: 'Booking Info',
    className: 'booking-info',
  },
  {
    id: 'sku',
    label: 'SKU',
    className: 'sku',
  },
  {
    id: 'product',
    label: 'Product',
    className: 'product',
  },
  {
    id: 'price',
    label: 'Price',
    className: 'price',
  },
  {
    id: 'quantity',
    label: 'Qty',
    className: 'quantity',
  },
  {
    id: 'orderId',
    label: 'Order ID',
    className: 'order-id',
  },
  {
    id: 'orderDate',
    label: 'Order Date',
    className: 'order-date',
  },
  {
    id: 'bookedBy',
    label: 'Booked by',
    className: 'booked-by',
  },
  {
    id: 'phone',
    label: 'Telephone',
    className: 'phone',
  },
  {
    id: 'email',
    label: 'Email',
    className: 'email',
  },
  {
    id: 'payment-method',
    label: 'Payment method',
    className: 'payment-method',
  },
  {
    id: 'actions',
    label: 'Actions',
    className: 'actions',
  },
];

export const rows = [
  {
    id: 1,
    'row-id': 1,
    firstName: 'David',
    lastName: 'Cooke',
    bookingName: 'David Cooke',
    class: 'test class',
    bookingInfo: 'What is a Sopwith Camel?: \nPlane Terms: Yes',
    sku: 'PRIZEDRAWQ62380',
    product: '£1 Ticket',
    price: '0.00',
    currency: '£',
    quantity: 1,
    orderId: 2626814,
    orderDate: '23/04/2023 12:08',
    bookedBy: 'David Cooke',
    phone: '0967207681',
    email: 'support@pta-events.co.uk',
    paymentMethod: 'Complimentary',
  },
];

export const eventOptions = [
  {
    value: 2020,
    label: 2020,
    subMenu: [
      {
        value: 10,
        label: 'Fireworks / Bonfire night',
      },
      {
        value: 11,
        label: 'Cinema',
      },
    ],
  },
];

export const productsOptions = [
  {
    value: 1,
    label: 'All Products',
  },
  {
    value: 2,
    label: '£1 Ticket (36)',
  },
  {
    value: 3,
    label: 'Prize Draw Entry',
  },
];

export const groupByOptions = [
  {
    value: 'className',
    label: 'Class Name',
  },
  {
    value: 'productName',
    label: 'Product Name',
  },
  {
    value: 'productOrder',
    label: 'Product Order',
  },
  {
    value: 'bookingName',
    label: 'Booking Name',
  },
];

export const menuActionsOptions = [
  {
    value: 'random',
    label: 'Select Random',
    icon: <ShuffleOutlinedIcon className="random" />,
  },
  {
    value: 'email',
    label: 'Email Bookings',
    icon: <MessageIcon color={theme.colors.main.black} className="email" />,
  },
  {
    value: 'customize-view',
    label: 'Export Doors Validation List',
    icon: <TuneOutlined className="customize-view" />,
  },
  {
    value: 'copy',
    label: 'Copy',
    icon: <ContentCopyOutlined className="copy" />,
  },
  {
    value: 'excel',
    label: 'Excel',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
  {
    value: 'pdf',
    label: 'Export Pdf',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
];

export const tableActionsOptions = [
  {
    value: 'order-details',
    label: 'Order Details',
    icon: <ListEditIcon color={theme.colors.main.black} />,
  },
  {
    value: 'remove',
    label: 'Remove',
    icon: <DeleteIcon color={theme.colors.main.black} />,
  },
];
