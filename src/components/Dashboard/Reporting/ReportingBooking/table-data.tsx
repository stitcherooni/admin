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
    id: 'firstName',
    label: 'First Name',
    className: 'first-name',
  },
  {
    id: 'lastName',
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
    id: 'product.name',
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
    id: 'customerName',
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
    id: 'paymentMethod',
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
    num: 1,
    firstName: '21-FirstName',
    lastName: '84-LastName',
    class: '43-Class',
    bookingInfo: '10-BookingInfo',
    sku: 45,
    price: 48,
    quantity: 10,
    orderId: 36,
    id: 55,
    product: {
      name: '52-Name',
      id: 34,
      bookable: false,
      productHideClass: true,
      quantityInStock: 51,
    },
    customerName: '75-CustomerName',
    bookingName: '87-BookingName',
    date: '2022-10-13T00:00:00',
    paymentMethod: 'Cash on collection',
    phone: '25-Phone',
    email: '31@email.com',
    order: {
      num: 88,
      id: 42,
      customerName: '43name',
      customerId: 25,
      status: '7status',
      date: '2022-07-01T00:00:00',
      orders: 31,
      value: {
        amount: 1,
        currency: 'GBP',
      },
      schoolName: '47SchoolName',
      email: '65@Email.com',
      transactionId: '54',
      payerEmail: '1@Email.com',
      paymentMethod: 'Cash',
      type: '27type',
      platformFee: 15,
      refunded: 44,
      history: {
        data: [
          {
            productId: 0,
            productName: '11name',
            quantity: 11,
            price: {
              amount: 38,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 29,
              currency: 'GBP',
            },
            status: 'OrderTest',
          },
          {
            productId: 1,
            productName: '18name',
            quantity: 16,
            price: {
              amount: 5,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 19,
              currency: 'GBP',
            },
            status: 'OrderReserved',
          },
          {
            productId: 2,
            productName: '96name',
            quantity: 47,
            price: {
              amount: 23,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 49,
              currency: 'GBP',
            },
            status: 'OrderDeleted',
          },
          {
            productId: 3,
            productName: '19name',
            quantity: 51,
            price: {
              amount: 20,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 35,
              currency: 'GBP',
            },
            status: 'OrderDispatched',
          },
        ],
        refundedQuantity: 34,
        refundedPrice: 72,
        refundedLineAmount: 97,
      },
    },
    bookingsId: [
      11,
      27,
      71,
    ],
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
