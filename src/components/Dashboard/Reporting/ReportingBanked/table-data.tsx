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
    orderId: 1260739,
    transactionId: '4035b6f9-5726-47ac-b804-64a55c7bf274',
    status: 'Paid',
    date: '12/05/2021 20:05',
    currency: '£',
    value: 5,
    bankedFee: 0.26,
    platformFee: 0.15,
  },
];

export const actionsOptions = [
  {
    value: 'test-transactions',
    label: 'Show Test Transactions',
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
