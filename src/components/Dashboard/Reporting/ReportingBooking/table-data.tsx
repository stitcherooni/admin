import React from 'react';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import { ContentCopyOutlined, TuneOutlined } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ListEditIcon from '../../../../assets/icons/list-edit-icon';
import DeleteIcon from '../../../../assets/icons/delete-icon';
import { theme } from '../../../../styles/defaultTheme';
import MessageIcon from '../../../../assets/icons/message-icon';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';

export const headCells = [
  {
    id: 'num',
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
    id: 'date',
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
];

export const rows = [
  {
    num: 1,
    firstName: '88-FirstName',
    lastName: '52-LastName',
    class: '27-Class',
    bookingInfo: '65-BookingInfo',
    sku: 42,
    price: 13,
    quantity: 3,
    orderId: 36,
    id: 75,
    product: {
      name: '75-Name',
      id: 56,
      bookable: false,
      productHideClass: false,
      quantityInStock: 25,
    },
    customerName: '68-CustomerName',
    bookingName: '2-BookingName',
    date: '2022-06-26T00:00:00',
    paymentMethod: null,
    phone: '92-Phone',
    email: '64@email.com',
    order: {
      num: 54,
      id: 11,
      customerName: '43name',
      customerId: 13,
      status: '6status',
      date: '2022-05-06T00:00:00',
      orders: 26,
      value: {
        amount: 14,
        currency: 'GBP',
      },
      schoolName: '19SchoolName',
      email: '55@Email.com',
      transactionId: '35',
      payerEmail: '34@Email.com',
      paymentMethod: 'Cheque',
      type: '14type',
      platformFee: 19,
      refunded: 33,
      history: {
        data: [
          {
            productId: 0,
            productName: '57name',
            quantity: 70,
            price: {
              amount: 42,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 28,
              currency: 'GBP',
            },
            status: 'OrderDispatched',
          },
          {
            productId: 1,
            productName: '94name',
            quantity: 17,
            price: {
              amount: 16,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 5,
              currency: 'GBP',
            },
            status: 'OrderFailed',
          },
          {
            productId: 2,
            productName: '31name',
            quantity: 77,
            price: {
              amount: 30,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 39,
              currency: 'GBP',
            },
            status: 'OrderDispatched',
          },
          {
            productId: 3,
            productName: '30name',
            quantity: 17,
            price: {
              amount: 13,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 41,
              currency: 'GBP',
            },
            status: 'OrderFailed',
          },
          {
            productId: 4,
            productName: '64name',
            quantity: 65,
            price: {
              amount: 23,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 30,
              currency: 'GBP',
            },
            status: 'OrderDeleted',
          },
          {
            productId: 5,
            productName: '30name',
            quantity: 33,
            price: {
              amount: 3,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 41,
              currency: 'GBP',
            },
            status: 'OrderDispatched',
          },
          {
            productId: 6,
            productName: '96name',
            quantity: 25,
            price: {
              amount: 6,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 22,
              currency: 'GBP',
            },
            status: 'OrderDispatched',
          },
          {
            productId: 7,
            productName: '42name',
            quantity: 30,
            price: {
              amount: 22,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 1,
              currency: 'GBP',
            },
            status: 'OrderRefunded',
          },
          {
            productId: 8,
            productName: '86name',
            quantity: 44,
            price: {
              amount: 12,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 31,
              currency: 'GBP',
            },
            status: 'OrderDeleted',
          },
          {
            productId: 9,
            productName: '48name',
            quantity: 38,
            price: {
              amount: 47,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 17,
              currency: 'GBP',
            },
            status: 'OrderFailed',
          },
          {
            productId: 10,
            productName: '19name',
            quantity: 62,
            price: {
              amount: 8,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 43,
              currency: 'GBP',
            },
            status: 'OrderDispatched',
          },
          {
            productId: 11,
            productName: '53name',
            quantity: 62,
            price: {
              amount: 9,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 22,
              currency: 'GBP',
            },
            status: 'OrderReserved',
          },
          {
            productId: 12,
            productName: '97name',
            quantity: 54,
            price: {
              amount: 7,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 12,
              currency: 'GBP',
            },
            status: 'OrderDeleted',
          },
          {
            productId: 13,
            productName: '67name',
            quantity: 23,
            price: {
              amount: 36,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 9,
              currency: 'GBP',
            },
            status: 'OrderDispatched',
          },
          {
            productId: 14,
            productName: '32name',
            quantity: 54,
            price: {
              amount: 11,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 10,
              currency: 'GBP',
            },
            status: 'OrderCompleted',
          },
        ],
        refundedQuantity: 50,
        refundedPrice: 44,
        refundedLineAmount: 5,
      },
    },
    bookingsId: [
      28,
      45,
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
    value: 'test-bookings',
    label: 'Show Test Bookings',
    icon: <ShoppingCartOutlinedIcon className="test-orders" />,
  },
  {
    value: 'live-bookings',
    label: 'Show Live Bookings',
    icon: <ShoppingCartOutlinedIcon className="test-orders" />,
  },
  {
    value: 'email',
    label: 'Email Bookings',
    icon: <MessageIcon color={theme.colors.main.black} className="email" />,
  },
  {
    value: 'customize-view',
    label: 'Customize View',
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
    value: 'pdf-customize-view',
    label: 'Export Doors Validation List',
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
