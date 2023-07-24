import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import React from 'react';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import { theme } from '../../../../styles/defaultTheme';

export const headCells = [
  {
    id: 'row-id',
    label: '##',
    className: 'row-id',
  },
  {
    id: 'id',
    label: 'ID',
    className: 'id',
  },
  {
    id: 'date',
    label: 'Date',
    className: 'date',
  },
  {
    id: 'customer-name',
    label: 'Customer',
    className: 'customer-name',
  },
  {
    id: 'customer-address',
    label: 'Address',
    className: 'customer-address',
  },
  {
    id: 'product',
    label: 'Product',
    className: 'product',
  },
  {
    id: 'type',
    label: 'Type',
    className: 'type',
  },
  {
    id: 'transactionId',
    label: 'Transaction ID',
    className: 'transaction-id',
  },
  {
    id: 'transactionEmail',
    label: 'Transaction Email',
    className: 'transaction-email',
  },
  {
    id: 'quantity',
    label: 'Qty',
    className: 'quantity',
  },
  {
    id: 'linePrice',
    label: 'Line Price',
    className: 'line-price',
  },
  {
    id: 'giftAid',
    label: 'Gift Aid',
    className: 'gift-aid',
  },
  {
    id: 'refunded',
    label: 'Refunded',
    className: 'refunded',
  },
  {
    id: 'feeNotPaid',
    label: 'Fee not paid',
    className: 'fee-not-paid',
  },
  {
    id: 'feePaid',
    label: 'Fee paid',
    className: 'fee-paid',
  },
  {
    id: 'platformFeesNotPaid',
    label: 'Platform fees not paid',
    className: 'platform-fees-not-paid',
  },
  {
    id: 'platform-fee-paid',
    label: 'Platform fee paid',
    className: 'platform-fee-paid',
  },
];

export const rows = [
  {
    id: 1,
    customerName: 'Thomas Crossman',
    product: 'Disco Ticket',
    date: '23 May 2023',
    email: 'example@gmail.com',
    toDate: '23 May 2023',
    order: 54,
    value: '1,278',
    currency: '£',
    'row-id': 1,
    address: 'The Barnsimg src 33 76 High Holbornimg src 44 Holbornimg src WC11THimgsrc77',
    type: 'Complimentary',
    transactionId: 124,
    transactionEmail: 'example@gmail.com',
    giftAid: 'any',
    refunded: 50,
    feeNotPaid: 0,
    feePaid: 5,
    platformFeesNotPaid: 0,
    platformFeePaid: 0,
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

export const groupByOptions = [
  {
    value: 'tickets',
    label: 'Tickets',
  },
  {
    value: 'vouchers',
    label: 'Vouchers',
  },
  {
    value: 'Prize Draws',
    label: 'Prize Draws',
  },
];

export const menuActionsOptions = [
  {
    value: 'customise-view',
    label: 'Customise View',
    icon: <TuneOutlined className="customize-view" />,
  },
  {
    value: 'copy',
    label: 'Copy',
    icon: <ContentCopyOutlined className="copy" />,
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
