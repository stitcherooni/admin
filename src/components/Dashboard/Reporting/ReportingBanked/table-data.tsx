import React from 'react';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import { theme } from '../../../../styles/defaultTheme';

export const headCells = [
  {
    id: 'num',
    label: '##',
    className: 'row-id',
  },
  {
    id: 'orderId',
    label: 'Order ID',
    className: 'order-id',
  },
  {
    id: 'transactionId',
    label: 'Transaction ID',
    className: 'transaction-id',
  },
  {
    id: 'status',
    label: 'Status',
    className: 'transaction-status',
  },
  {
    id: 'date',
    label: 'Date',
    className: 'transaction-date',
  },
  {
    id: 'value',
    label: 'Value',
    className: 'transaction-value',
  },
  {
    id: 'bankedFee',
    label: 'Banked Fee',
    className: 'banked-fee',
  },
  {
    id: 'platformFee',
    label: 'Platform Fee',
    className: 'platform-fee',
  },
];

export const rows = [
  {
    num: 1,
    orderId: 44,
    status: '26Status',
    date: '2022-09-22T00:00:00',
    value: 43,
    bankedFee: 38,
    platformFee: 31,
    order: {
      num: 1,
      id: 3,
      customerName: '22name',
      customerId: 9,
      status: '6status',
      date: '2022-03-17T00:00:00',
      orders: 16,
      value: {
        amount: 27,
        currency: 'GBP',
      },
      schoolName: '12SchoolName',
      email: '54@Email.com',
      transactionId: '51',
      payerEmail: '55@Email.com',
      paymentMethod: null,
      type: '39type',
      platformFee: 6,
      refunded: 31,
      history: {
        data: [
          {
            productId: 0,
            productName: '17name',
            quantity: 40,
            price: {
              amount: 36,
              currency: 'GBP',
            },
            lineAmount: {
              amount: 42,
              currency: 'GBP',
            },
            status: 'OrderReserved',
          },
        ],
        refundedQuantity: 44,
        refundedPrice: 2,
        refundedLineAmount: 91,
      },
    },
    transactionId: 30,
  },
];

export const actionsOptions = [
  {
    value: 'test-transactions',
    label: 'Show Test Transactions',
    icon: <ShoppingCartOutlinedIcon className="test-orders" />,
  },
  {
    value: 'live-transactions',
    label: 'Show Live Transactions',
    icon: <ShoppingCartOutlinedIcon className="test-orders" />,
  },
  {
    value: 'customize-view',
    label: 'Customize View',
    icon: <TuneOutlinedIcon className="customize-view" />,
  },
  {
    value: 'copy',
    label: 'Copy',
    icon: <ContentCopyOutlinedIcon className="copy" />,
  },
  {
    value: 'excel',
    label: 'Export Excel',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
  {
    value: 'pdf',
    label: 'Export Pdf',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
];
