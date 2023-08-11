import React from 'react';
import ListEditIcon from '../../../../assets/icons/list-edit-icon';
import { theme } from '../../../../styles/defaultTheme';
import MessageIcon from '../../../../assets/icons/message-icon';
import ArrowLeftDoubleShake from '../../../../assets/icons/arrow-left-double-shake';
import ArrowLeftCurvedIcon from '../../../../assets/icons/arrow-left-curved-icon';
import DeliveryIcon from '../../../../assets/icons/delivery-icon';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import ShevronRight from '../../../../assets/icons/shevron-right';
import DeleteIcon from '../../../../assets/icons/delete-icon';

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
    id: 'status',
    label: 'Status',
    className: 'status',
  },
  {
    id: 'customer-name',
    label: 'Customer',
    className: 'customer-name',
  },
  {
    id: 'payment-method',
    label: 'Method',
    className: 'payment-method',
  },
  {
    id: 'type',
    label: 'Type',
    className: 'type',
  },
  {
    id: 'amount',
    label: 'Value',
    className: 'orders-value',
  },
  // {
  //   id: 'count',
  //   label: 'Order',
  //   className: 'orders',
  // },
  {
    id: 'platformFee',
    label: 'Platform Fee',
    className: 'platform-fee',
  },
  {
    id: 'refunded',
    label: 'Refunded',
    className: 'refunded',
  },
  {
    id: 'actions',
    label: 'Actions',
    className: 'actions',
  },
];

export const rows = [
  {
    'row-id': 1,
    id: 1,
    customerName: 'Thomas Crossman',
    status: 'Dispatched',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
    method: 'Complimentary',
    type: 'web',
    platformFee: 10,
    refunded: 0,
  },
  {
    id: 2,
    customerName: 'Thomas Crossman',
    status: 'Awaiting Dispatch',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
  {
    id: 3,
    customerName: 'Thomas Crossman',
    status: 'Awaiting Dispatch',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
  {
    id: 4,
    customerName: 'Thomas Crossman',
    status: 'Refunded',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
  {
    id: 5,
    customerName: 'Thomas Crossman',
    status: 'Awaiting Dispatch',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
  {
    id: 6,
    customerName: 'Thomas Crossman',
    status: 'Awaiting Dispatch',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
];

export const actionsOptions = [
  {
    value: 'order-details',
    label: 'View Order',
    icon: <ListEditIcon color={theme.colors.main.black} />,
  },
  {
    value: 'email-customer',
    label: 'Email Customer',
    icon: <MessageIcon color={theme.colors.main.black} />,
  },
  {
    value: 'resend-confirmation',
    label: 'Resend confirmation email',
    icon: <MessageIcon color={theme.colors.main.black} />,
  },
  {
    value: 'delete-order',
    label: 'Delete Order',
    icon: <DeleteIcon color={theme.colors.main.black} />,
  },
  {
    value: 'refund-order',
    label: 'Refund Order',
    icon: <ArrowLeftDoubleShake color={theme.colors.main.black} />,
  },
  {
    value: 'partial-refund',
    label: 'Partial Refund (Beta)',
    icon: <ArrowLeftCurvedIcon color={theme.colors.main.black} />,
  },
  {
    value: 'make-not-dispatched',
    label: 'Mark as not dispached',
    icon: <DeliveryIcon color={theme.colors.main.black} />,
  },
  {
    value: 'export-delivery',
    label: 'Export Delivery Note',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
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
    label: 'Excel',
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
