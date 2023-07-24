import React from 'react';
import MessageIcon from '../../../../assets/icons/message-icon';
import { theme } from '../../../../styles/defaultTheme';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import ShevronRight from '../../../../assets/icons/shevron-right';

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
    id: 'eventName',
    label: 'Event',
    className: 'event-name',
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
    id: 'paypalId',
    label: 'Paypal ID',
    className: 'paypal-id',
  },
  {
    id: 'paypalEmail',
    label: 'Paypal Email',
    className: 'paypal-email',
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
    id: 'cost',
    label: 'Cost',
    className: 'cost',
  },
];

export const rows = [
  {
    id: 1,
    customerName: 'Thomas Crossman',
    product: 'Disco Ticket',
    date: '23 May 2023',
    order: 54,
    value: '1,278',
    currency: '£',
    'row-id': 1,
    type: 'Complimentary',
    paypalId: 124,
    paypalEmail: 'example@gmail.com',
    giftAid: 'any',
    refunded: 50,
    eventName: 'Big PTA Quiz',
  },
];

export const menuActionsOptions = [
  {
    value: 'message',
    label: 'Send Message to (0) Customers',
    icon: <MessageIcon className="email" color={theme.colors.main.black} />,
  },
  {
    value: 'newsletter',
    label: 'Send Newsletter to (0) Customers',
    icon: <MessageIcon className="email" color={theme.colors.main.black} />,
  },
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
  {
    value: 'search',
    label: 'Search & Advanced Filtering',
    icon: <ShevronRight color={theme.colors.main.black} />,
  },
];