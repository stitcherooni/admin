import React from 'react';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import { ContentCopyOutlined, TuneOutlined } from '@mui/icons-material';
import { theme } from '../../../../styles/defaultTheme';
import MessageIcon from '../../../../assets/icons/message-icon';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import DeleteIcon from '../../../../assets/icons/delete-icon';
import ShevronRight from '../../../../assets/icons/shevron-right';

export const headCells = [
  {
    id: 'num',
    label: '##',
    className: 'row-id',
  },
  {
    id: 'id',
    label: 'ID',
    className: 'id',
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
    id: 'date',
    label: 'Reg Date',
    className: 'date',
  },
  {
    id: 'approved',
    label: 'Approved',
    className: 'approved',
  },
  {
    id: 'send-email',
    label: 'Send Email',
    className: 'send-email',
  },
  {
    id: 'delete-customer',
    label: 'Delete',
    className: 'delete-customer',
  },
  {
    id: 'orders',
    label: 'Orders',
    className: 'orders',
  },
  {
    id: 'value',
    label: 'Order Value',
    className: 'order-value',
  },
];

export const rows = [
  {
    'row-id': 1,
    id: 1,
    firstName: 'Alex',
    lastName: 'Crossman',
    child: 'Avalon Wild (2A)',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
  {
    'row-id': 2,
    id: 2,
    firstName: 'Thomas',
    lastName: 'Crossman',
    child: 'Avalon Wild (2A)',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
  {
    'row-id': 3,
    id: 3,
    firstName: 'Oleksii',
    lastName: 'Lomakin',
    child: 'Avalon Wild (2A)',
    date: '23 May 2023',
    count: 74,
    amount: 1278,
    currency: '£',
  },
  {
    'row-id': 4,
    id: 4,
    firstName: 'Kateryna',
    lastName: 'Goncharova',
    child: 'Daniel',
    date: '23 May 2023',
    count: 54,
    amount: 10,
    currency: '£',
  },
  {
    'row-id': 5,
    id: 5,
    firstName: 'Thomas',
    lastName: 'Crossman',
    child: 'Orest',
    date: '23 May 2023',
    count: 104,
    amount: 1278,
    currency: '£',
  },
  {
    'row-id': 6,
    id: 6,
    firstName: 'Thomas',
    lastName: 'Crossman',
    child: 'Avalon Wild (2A)',
    date: '23 May 2023',
    count: 54,
    amount: 1278,
    currency: '£',
  },
];

export const actionsOptions = [
  {
    value: 'email-customer',
    label: 'Email Customer',
    icon: <MessageIcon color={theme.colors.main.black} />,
  },
  {
    value: 'remove',
    label: 'Remove Customer',
    icon: <DeleteIcon color={theme.colors.main.black} />,
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
    label: 'Export to Excel',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
  {
    value: 'pdf',
    label: 'Export to PDF',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
  {
    value: 'search',
    label: 'Search & Advanced Filtering',
    icon: <ShevronRight color={theme.colors.main.black} />,
  },
];
